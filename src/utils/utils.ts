import { CxOrderProps, CxProps, Status } from '../types/types';

export function curatePath(path: string): string {
  return path[path.length - 1] === '/' && path !== '/' ? path.slice(0, path.length - 1) : path;
}

export function isNil(v: any) {
  return v === undefined || v === null;
}

export function isNonEmptyString(v: any) {
  return !isNil(v) && v !== '';
}

export function mapConfigToCx(
  baseEnter: CxProps['enter'],
  baseExit: CxProps['exit'],
  baseEnterReverse: CxProps['enterReverse'],
  baseExitReverse: CxOrderProps['exitReverse'],
  status: Status,
  crtChildConfig: CxOrderProps,
  lastBeforeStableChildConfig: CxOrderProps,
  defaultStable: string,
) {
  let c = `c ${status}`;
  let l = `c ${status}`;
  if (status === 'stable') {
    c = `${c} ${defaultStable}`;
    return { c, l };
  }

  const order1 = crtChildConfig.order;
  const order2 = lastBeforeStableChildConfig.order;

  const crtEnter = crtChildConfig.enter;
  const prvExit = lastBeforeStableChildConfig.exit;

  let direction = 1;
  if (!isNil(order1) && !isNil(order2)) {
    direction = order1 - order2;
  }

  const crtEnterReverse = crtChildConfig.enterReverse;
  const prvExitReverse = lastBeforeStableChildConfig.exitReverse;

  const enter = isNonEmptyString(crtEnter) ? crtEnter : baseEnter;
  const exit = isNonEmptyString(prvExit) ? prvExit : baseExit;
  const enterReverse = isNonEmptyString(crtEnterReverse) ? crtEnterReverse : baseEnterReverse;
  const exitReverse = isNonEmptyString(prvExitReverse) ? prvExitReverse : baseExitReverse;

  let c1 = direction > 0 ? enter : enterReverse;
  let l1 = direction > 0 ? exit : exitReverse;
  c = `c current ${status} ${c1}`;
  l = `c previous ${status} ${l1}`;

  return { c, l };
}
