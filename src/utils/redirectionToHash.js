export const redirectToHash = () => {
    if (!window.location.hash) {
        window.location.replace(`${window.location.origin}/#${window.location.pathname}`);
    }
};