document.addEventListener("DOMContentLoaded", async () => {
    obs.connect();
    await obs.send('SetCurrentScene', { 'scene-name': 'Setup' });
    await obs.send('EnableStudioMode');
    await obs.send('SetPreviewScene', { 'scene-name': 'Live' });
});