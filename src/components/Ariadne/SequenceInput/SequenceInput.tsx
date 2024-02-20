import { $getRoot, $getSelection, EditorState } from "lexical";
import { useEffect } from "react";

import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { classNames } from "@utils/stringUtils";

import type {
  AnnotatedAA,
  AnnotatedBase,
  AnnotatedNucl,
  AnnotatedSequence,
  AriadneSelection,
  StackedAnnotation,
} from "@Ariadne/types";

export const SequenceInput = ({}: {}) => {
  return (
    <>
      <Editor />
    </>
  );
};

const theme = {
  invalidBase: {
    color: "red",
    fontWeight: "bold",
  },
};
import { TextNode, $isTextNode } from "lexical";

function nonDnaBaseDecorator(node: TextNode) {
  const textContent = node.getTextContent();
  const formattedText = textContent.replace(/[^ACGTU]/gi, (match) => {
    return `<span class='nonDnaBase'>${match}</span>`;
  });

  node.setFormat("nonDnaBase" as TextFormat);
  return formattedText;
}

// When the editor changes, you can get notified via the
// LexicalOnChangePlugin!
function onChange(editorState: EditorState) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();

    console.log(root, selection);
  });
}

// Lexical React plugins are React components, which makes them
// highly composable. Furthermore, you can lazy load plugins if
// desired, so you don't pay the cost for plugins until you
// actually use them.
function MyCustomAutoFocusPlugin() {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    // Focus the editor when the effect fires!
    editor.focus();
  }, [editor]);

  return null;
}

// Catch any errors that occur during Lexical updates and log them
// or throw them as needed. If you don't throw them, Lexical will
// try to recover gracefully without losing user data.
function onError(error) {
  console.error(error);
}

function Editor() {
  const initialConfig = {
    namespace: "MyEditor",
    theme,
    onError,
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={<ContentEditable className="editor-input" />}
        placeholder={"Type something..."}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <OnChangePlugin onChange={onChange} />
      <HistoryPlugin />
      <MyCustomAutoFocusPlugin />
    </LexicalComposer>
  );
}
