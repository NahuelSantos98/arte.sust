export const redirectToHash = () => {
    const excludedPaths = ['/torrecillas'];
    const currentPath = window.location.pathname;

    if (!excludedPaths.some(path => currentPath.startsWith(path)) && !window.location.hash) {
        window.location.replace(`${window.location.origin}/#${currentPath}`);
    }
};
