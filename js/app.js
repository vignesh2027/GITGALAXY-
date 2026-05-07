// GitGalaxy - Vue 3 Application
import { LEVELS, COMMAND_INFO, ACHIEVEMENTS } from './levels.js';
import { AudioEngine } from './audio.js';
import { RunnerGame } from './game.js';
import { GalaxyScene } from './scene.js';

export async function createApp(Vue, THREE) {
  const { createApp, ref, computed, reactive, onMounted, watch, nextTick } = Vue;

  const app = createApp({
    setup() {
      // State
      const screen = ref('onboarding'); // onboarding, menu, briefing, game, result
      const onboardStep = ref(0);
      const currentLevel = ref(1);
      const highestLevel = ref(1);
      const totalXP = ref(0);
      const xpForNext = ref(500);
      const completedLevels = reactive(new Set());
      const masteredCommands = reactive(new Set());
      const earnedAchievements = reactive(new Set());
      const lives = ref(3);
      const combo = ref(0);
      const score = ref(0);
      const flowState = ref(false);
      const showDrawer = ref(false);
      const showSettings = ref(false);
      const showAchievements = ref(false);
      const searchQuery = ref('');
      const volume = ref(50);
      const toast = ref(null);
      const toastTimeout = ref(null);
      const streakDays = ref([false,false,false,true,false,false,false]);
      const currentDayIndex = ref(3);
      const resultData = ref(null);
      const isMobile = ref(window.innerWidth < 768);

      // Instances
      let audio = new AudioEngine();
      let game = null;
      let galaxyScene = null;
      let gameCanvas = null;

      const levels = LEVELS;
      const achievements = ACHIEVEMENTS;

      const xpPct = computed(() => Math.min(100, (totalXP.value % xpForNext.value) / xpForNext.value * 100));
      const playerLevel = computed(() => Math.floor(totalXP.value / xpForNext.value) + 1);

      const currentLevelData = computed(() => levels.find(l => l.id === currentLevel.value));

      const filteredCommands = computed(() => {
        const q = searchQuery.value.toLowerCase();
        const allCmds = [];
        levels.forEach(lv => {
          lv.commands.forEach(cmd => {
            if (!q || cmd.toLowerCase().includes(q)) {
              allCmds.push({
                cmd,
                level: lv.id,
                tier: lv.tier,
                info: COMMAND_INFO[cmd],
                mastered: masteredCommands.has(cmd)
              });
            }
          });
        });
        // Deduplicate
        const seen = new Set();
        return allCmds.filter(c => { if(seen.has(c.cmd)) return false; seen.add(c.cmd); return true; });
      });

      function getLevelStatus(lv) {
        if (completedLevels.has(lv.id)) return 'completed';
        if (lv.id === highestLevel.value) return 'current';
        if (lv.id <= highestLevel.value) return 'completed';
        return 'locked';
      }

      function getTierColor(tier) {
        const colors = { basics:'#00f5ff', branching:'#39ff14', remote:'#f5a623', github:'#ff2d55', advanced:'#b366ff', hero:'#ff2d55' };
        return colors[tier] || '#00f5ff';
      }

      function showToast(msg, type='success') {
        if (toastTimeout.value) clearTimeout(toastTimeout.value);
        toast.value = { msg, type };
        toastTimeout.value = setTimeout(() => { toast.value = null; }, 3000);
      }

      function checkAchievements() {
        if (completedLevels.has(1) && !earnedAchievements.has('first_commit')) {
          earnedAchievements.add('first_commit');
          showToast('🏆 Achievement: First Commit Crusader!');
          audio.playAchievement();
        }
        if (completedLevels.has(9) && !earnedAchievements.has('merge_master')) {
          earnedAchievements.add('merge_master');
          showToast('🏆 Achievement: Merge Master!');
          audio.playAchievement();
        }
        if (completedLevels.has(10) && !earnedAchievements.has('rebase_ranger')) {
          earnedAchievements.add('rebase_ranger');
          showToast('🏆 Achievement: Rebase Ranger!');
          audio.playAchievement();
        }
        if (completedLevels.has(22) && !earnedAchievements.has('pr_prophet')) {
          earnedAchievements.add('pr_prophet');
          showToast('🏆 Achievement: Pull Request Prophet!');
          audio.playAchievement();
        }
        if (completedLevels.has(31) && !earnedAchievements.has('cherry_picker')) {
          earnedAchievements.add('cherry_picker');
          showToast('🏆 Achievement: Cherry Picker!');
          audio.playAchievement();
        }
        if (completedLevels.size >= 25 && !earnedAchievements.has('halfway')) {
          earnedAchievements.add('halfway');
          showToast('🏆 Achievement: Halfway Hero!');
          audio.playAchievement();
        }
        if (completedLevels.size >= 50 && !earnedAchievements.has('galaxy_master')) {
          earnedAchievements.add('galaxy_master');
          showToast('🏆 Achievement: Galaxy Master!');
          audio.playAchievement();
        }
      }

      // Onboarding
      function advanceOnboard() {
        audio.init();
        audio.playClick();
        onboardStep.value++;
        if (onboardStep.value >= 3) {
          screen.value = 'menu';
          audio.startMusic();
        }
      }

      // Level selection
      function selectLevel(lv) {
        const status = getLevelStatus(lv);
        if (status === 'locked') return;
        audio.playClick();
        currentLevel.value = lv.id;
        screen.value = 'briefing';
      }

      // Start game
      async function startGame() {
        audio.playClick();
        screen.value = 'game';
        await nextTick();
        
        gameCanvas = document.getElementById('game-canvas');
        if (!gameCanvas) return;
        
        const container = gameCanvas.parentElement;
        gameCanvas.width = Math.min(900, container.clientWidth - 20);
        gameCanvas.height = Math.min(500, window.innerHeight - 120);

        game = new RunnerGame(
          gameCanvas,
          (correct, sc, cmb) => {
            score.value = sc;
            combo.value = cmb;
            if (correct) {
              audio.playCorrect();
              totalXP.value += 50 * (1 + cmb * 0.2);
            } else {
              audio.playWrong();
              lives.value = game.lives;
            }
          },
          (finalScore, correct, total, maxCombo) => {
            onGameEnd(finalScore, correct, total, maxCombo);
          },
          (type, active) => {
            if (type === 'flow') {
              flowState.value = active;
              audio.setFlowState(active);
              if (active) {
                showToast('🔥 FLOW STATE ACTIVATED!', 'success');
                if (!earnedAchievements.has('flow_state') && maxCombo >= 10) {
                  earnedAchievements.add('flow_state');
                  audio.playAchievement();
                }
              }
            }
          }
        );
        
        const lvData = currentLevelData.value;
        lives.value = 3;
        combo.value = 0;
        score.value = 0;
        flowState.value = false;
        game.startLevel(lvData.commands, currentLevel.value);
      }

      function onGameEnd(finalScore, correct, total, maxCombo) {
        const passed = correct >= 3; // Need at least 3/5
        resultData.value = { finalScore, correct, total, maxCombo, passed };
        
        if (passed) {
          completedLevels.add(currentLevel.value);
          // Mark commands as mastered
          const lvData = currentLevelData.value;
          lvData.commands.forEach(c => masteredCommands.add(c));
          
          if (currentLevel.value >= highestLevel.value) {
            highestLevel.value = Math.min(50, currentLevel.value + 1);
          }
          totalXP.value += finalScore;
          audio.playLevelComplete();
          checkAchievements();
          
          if (correct === total && !earnedAchievements.has('perfectionist')) {
            earnedAchievements.add('perfectionist');
            showToast('🏆 Achievement: Perfectionist!');
            audio.playAchievement();
          }
        }
        
        screen.value = 'result';
        if (game) { game.destroy(); game = null; }
      }

      function backToMenu() {
        audio.playClick();
        screen.value = 'menu';
        flowState.value = false;
      }

      function retryLevel() {
        audio.playClick();
        screen.value = 'briefing';
      }

      function nextLevel() {
        audio.playClick();
        if (currentLevel.value < 50) {
          currentLevel.value++;
          screen.value = 'briefing';
        } else {
          screen.value = 'menu';
        }
      }

      function toggleDrawer() { audio.playClick(); showDrawer.value = !showDrawer.value; }
      function toggleSettings() { audio.playClick(); showSettings.value = !showSettings.value; }
      function toggleAchievements() { audio.playClick(); showAchievements.value = !showAchievements.value; }

      watch(volume, (v) => { audio.setVolume(v / 100); });

      onMounted(async () => {
        // Init Three.js scene
        const container = document.getElementById('three-container');
        if (container && THREE) {
          galaxyScene = new GalaxyScene(container);
          await galaxyScene.init(THREE);
        }
        window.addEventListener('resize', () => { isMobile.value = window.innerWidth < 768; });
        // Mark today's streak
        streakDays.value[currentDayIndex.value] = true;
      });

      return {
        screen, onboardStep, currentLevel, highestLevel, totalXP, xpForNext, completedLevels,
        masteredCommands, earnedAchievements, lives, combo, score, flowState,
        showDrawer, showSettings, showAchievements, searchQuery, volume, toast, resultData,
        levels, achievements, xpPct, playerLevel, currentLevelData, filteredCommands,
        streakDays, currentDayIndex, isMobile,
        getLevelStatus, getTierColor, advanceOnboard, selectLevel, startGame,
        backToMenu, retryLevel, nextLevel, toggleDrawer, toggleSettings, toggleAchievements,
        showToast, COMMAND_INFO
      };
    }
  });

  return app;
}
