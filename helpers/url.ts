export const getNearestMatchingPath = (pathname: string, paths: string[]) =>
  paths.reduce(
    (matchingPath, matchPath) =>
      pathname.startsWith(matchPath) && matchPath.length > (matchingPath?.length ?? 0) ? matchPath : matchingPath,
    '',
  );
