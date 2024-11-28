'use client';

import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { EditorProvider, useCurrentEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';
import { List, ListOrdered, Undo, Redo } from 'lucide-react';

const MenuBar = () => {
  const { editor } = useCurrentEditor();

  if (!editor) {
    return null;
  }

  return (
    <div className="control-group">
      <div className="button-group">
        {/*<button*/}
        {/*  onClick={() => editor.chain().focus().toggleStrike().run()}*/}
        {/*  disabled={!editor.can().chain().focus().toggleStrike().run()}*/}
        {/*  className={editor.isActive('strike') ? 'is-active' : ''}*/}
        {/*>*/}
        {/*  Strike*/}
        {/*</button>*/}
        {/*<button*/}
        {/*  onClick={() => editor.chain().focus().toggleCode().run()}*/}
        {/*  disabled={!editor.can().chain().focus().toggleCode().run()}*/}
        {/*  className={editor.isActive('code') ? 'is-active' : ''}*/}
        {/*>*/}
        {/*  Code*/}
        {/*</button>*/}
        {/*<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>*/}
        {/*  Clear marks*/}
        {/*</button>*/}
        {/*<button onClick={() => editor.chain().focus().clearNodes().run()}>*/}
        {/*  Clear nodes*/}
        {/*</button>*/}
        {/*<button*/}
        {/*  onClick={() => editor.chain().focus().setParagraph().run()}*/}
        {/*  className={editor.isActive('paragraph') ? 'is-active' : ''}*/}
        {/*>*/}
        {/*  Paragraph*/}
        {/*</button>*/}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
          }
        >
          H4
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive('heading', { level: 5 }) ? 'is-active' : ''
          }
        >
          H5
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive('heading', { level: 6 }) ? 'is-active' : ''
          }
        >
          H6
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          <List />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <ListOrdered />
        </button>
        {/*<button*/}
        {/*  onClick={() => editor.chain().focus().toggleCodeBlock().run()}*/}
        {/*  className={editor.isActive('codeBlock') ? 'is-active' : ''}*/}
        {/*>*/}
        {/*  Code block*/}
        {/*</button>*/}
        {/*<button*/}
        {/*  onClick={() => editor.chain().focus().toggleBlockquote().run()}*/}
        {/*  className={editor.isActive('blockquote') ? 'is-active' : ''}*/}
        {/*>*/}
        {/*  Blockquote*/}
        {/*</button>*/}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          粗體
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          斜體
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          分隔線
        </button>
        {/*<button onClick={() => editor.chain().focus().setHardBreak().run()}>*/}
        {/*  Hard break*/}
        {/*</button>*/}
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo />
        </button>
      </div>
    </div>
  );
};

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const content = `
  <h1>臺南市閒置市有不動產活化新進展：創新利用助推城市永續發展</h1>
  <p>日期： 2024.11.09</p>
  <p>
    臺南市政府積極推動閒置市有不動產的活化利用，透過多元策略提升公共資產效益，滿足市民多樣需求。
  </p>
  <h2>活化成果顯著</h2>
  <p>
    自縣市合併升格以來，臺南市政府成立「市有土地及建物利用規劃專案小組」，定期盤點並清查閒置空間，採取滾動式管理。截至
    2024 年 2 月，已成功活化 215 處閒置空間，節省支出達 87 億元。
  </p>
  <h2>多元活化案例</h2>
  <p>
    市府將閒置空間轉型為托育、遊憩、社區關懷等多功能場域。例如，鹽水消防分隊舊廳舍經整修後，成為「鹽水區社區心理衛生中心」，提供心理諮商與健康促進活動。
  </p>
  <p>
    此外，前移民署服務站舊址改造為「藏金閣2館」，展示再生家具與創作小物，結合烏橋公園特色遊戲場，成為市民新興打卡地標。
  </p>
  <h2>公私協力典範</h2>
  <p>
    臺南市政府與中央機關合作，活化閒置國有資產。例如，安平福爾摩沙遊艇酒店
    BOT
    案、南區商八開發案的誠品與碳佐麻里進駐、中西區煙波飯店設定地上權案，以及藍晒圖文創園區等，均為成功案例。
  </p>
  <h2>未來展望</h2>
  <p>
    市長黃偉哲強調，市有財產應充分利用，除非涉及高額開發成本，否則應以出租或設定地上權為主，達到永續經營目標。
  </p>
  <p>
    財政稅務局表示，未來將持續清查閒置空間，並與相關單位合作，透過促參
    BOT、OT、委外經營或設定地上權等方式，邀請民間參與活化，實現公私雙贏。
  </p>
  <p>
    臺南市政府透過積極活化閒置市有不動產，不僅提升公共資產效益，亦滿足市民多元需求，展現城市創新與永續發展的決心。
  </p>
`;

function Editor() {
  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content={content}
    />
  );
}

export default Editor;
