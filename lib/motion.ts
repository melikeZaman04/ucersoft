const KEY = "ucersoft-motion";
const EVENT = "ucersoft:motion";

export function isMotionOff(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.dataset.motion === "off";
}

export function setMotionOff(off: boolean) {
  document.documentElement.dataset.motion = off ? "off" : "on";
  try {
    window.localStorage.setItem(KEY, off ? "off" : "on");
  } catch {
    /* depolama kapalı olabilir */
  }
  window.dispatchEvent(new CustomEvent(EVENT, { detail: off }));
}

export function subscribeMotion(listener: (off: boolean) => void) {
  const onChange = () => listener(isMotionOff());
  window.addEventListener(EVENT, onChange);
  return () => window.removeEventListener(EVENT, onChange);
}

/* Sayfa boyanmadan önce çalışır; tercih edilen durumu html üzerine yazar. */
export const motionBootScript = `(function(){try{var v=localStorage.getItem("${KEY}");if(v==="off"){document.documentElement.dataset.motion="off";}}catch(e){}})();`;
