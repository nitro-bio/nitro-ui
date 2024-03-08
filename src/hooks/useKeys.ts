import { useEffect, useState } from "react";
import { z } from "zod";

const useKeys = () => {
  const [keys, setKeys] = useState<Set<Key>>(new Set());
  const [addKey, removeKey] = [
    (key: Key) =>
      setKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.add(key);
        return newKeys;
      }),
    (key: Key) =>
      setKeys((prevKeys) => {
        const newKeys = new Set(prevKeys);
        newKeys.delete(key);
        return newKeys;
      }),
  ];

  useEffect(function mountHandlers() {
    const downHandler = (event: KeyboardEvent) => {
      const key = KeySchema.parse(event.key);
      addKey(key);
    };

    const upHandler = (event: KeyboardEvent) => {
      const key = KeySchema.parse(event.key);
      removeKey(key);
    };

    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  }, []);

  const isKeyDown = (key: string) => {
    const parsedKey = KeySchema.safeParse(key);
    if (!parsedKey.success) {
      throw new Error(`Invalid key: ${key}`);
    }
    return keys.has(parsedKey.data);
  };

  return { keys, isKeyDown };
};

export default useKeys;

const KeySchema = z.union([
  z.literal("ArrowUp"),
  z.literal("ArrowDown"),
  z.literal("ArrowLeft"),
  z.literal("ArrowRight"),
  z.literal(" "),
  z.literal("Enter"),
  z.literal("Escape"),
  z.literal("Shift"),
  z.literal("Control"),
  z.literal("Alt"),
  z.literal("Meta"),
  z.literal("Tab"),
  z.literal("Backspace"),
  z.literal("Insert"),
  z.literal("Delete"),
  z.literal("PageUp"),
  z.literal("PageDown"),
  z.literal("Home"),
  z.literal("End"),
  z.literal("CapsLock"),
  z.literal("NumLock"),
  z.literal("ScrollLock"),
  z.literal("Pause"),
  z.literal("PrintScreen"),
  z.literal("ContextMenu"),
  z.literal("Help"),
  z.literal("F1"),
  z.literal("F2"),
  z.literal("F3"),
  z.literal("F4"),
  z.literal("F5"),
  z.literal("F6"),
  z.literal("F7"),
  z.literal("F8"),
  z.literal("F9"),
  z.literal("F10"),
  z.literal("F11"),
  z.literal("F12"),
  z.literal("F13"),
  z.literal("F14"),
  z.literal("F15"),
  z.literal("F16"),
  z.literal("F17"),
  z.literal("F18"),
  z.literal("F19"),
  z.literal("F20"),
  z.literal("F21"),
  z.literal("F22"),
  z.literal("F23"),
  z.literal("F24"),
  z.literal("Numpad0"),
  z.literal("Numpad1"),
  z.literal("Numpad2"),
  z.literal("Numpad3"),
  z.literal("Numpad4"),
  z.literal("Numpad5"),
  z.literal("Numpad6"),
  z.literal("Numpad7"),
  z.literal("Numpad8"),
  z.literal("Numpad9"),
  z.literal("NumpadDecimal"),
  z.literal("NumpadAdd"),
  z.literal("NumpadSubtract"),
  z.literal("NumpadMultiply"),
  z.literal("NumpadDivide"),
  z.literal("NumpadEnter"),
  z.literal("NumpadEqual"),
  z.literal("NumpadComma"),
  z.literal("NumpadClear"),
  // Include letter keys A-Z
  z.literal("A"),
  z.literal("B"),
  z.literal("C"),
  z.literal("D"),
  z.literal("E"),
  z.literal("F"),
  z.literal("G"),
  z.literal("H"),
  z.literal("I"),
  z.literal("J"),
  z.literal("K"),
  z.literal("L"),
  z.literal("M"),
  z.literal("N"),
  z.literal("O"),
  z.literal("P"),
  z.literal("Q"),
  z.literal("R"),
  z.literal("S"),
  z.literal("T"),
  z.literal("U"),
  z.literal("V"),
  z.literal("W"),
  z.literal("X"),
  z.literal("Y"),
  z.literal("Z"),
  // Include number keys 0-9
  z.literal("0"),
  z.literal("1"),
  z.literal("2"),
  z.literal("3"),
  z.literal("4"),
  z.literal("5"),
  z.literal("6"),
  z.literal("7"),
  z.literal("8"),
  z.literal("9"),
  // Other keys on the keyboard
  z.literal(";"),
  z.literal("="),
  z.literal(","),
  z.literal("-"),
  z.literal("."),
  z.literal("/"),
  z.literal("`"),
  z.literal("["),
  z.literal("\\"),
  z.literal("]"),
  z.literal("'"),
]);
type Key = z.infer<typeof KeySchema>;
