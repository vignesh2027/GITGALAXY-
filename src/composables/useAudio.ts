import { useAudioStore } from '../stores/audio'

export function useAudio() {
  const store = useAudioStore()
  return {
    click:       () => store.playUI('click'),
    hover:       () => store.playUI('hover'),
    success:     () => store.playUI('success'),
    error:       () => store.playUI('error'),
    xp:          () => store.playUI('xp'),
    achievement: () => store.playAchievement(),
    toggleMute:  () => store.toggleMute(),
    muted:       store.muted
  }
}
