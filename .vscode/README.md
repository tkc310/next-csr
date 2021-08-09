# .vscode

vscode の設定ファイルを配置しています。  
(設定の適用は vscode に限定されます)

## setting.json

@see <https://code.visualstudio.com/docs/editor/codebasics?source=post_page#_formatting>

下記の設定をしています。

- eslint, stylelint による静的解析でエラーがエディタ上に表示
- コード保存、ペースト、タイプ時に prettier が実行
- 上記を markdown ファイルには適用しない

## react.code-snippet

@see <https://code.visualstudio.com/docs/editor/userdefinedsnippets>

tsx 内でスニペット名を入力して、表示されたサジェストから登録したスニペットを選択するとコードを展開してくれます。  
e.g. `fc` と入力してサジェストされた登録したスニペット `fc` を選択すると functional component のスニペットが展開する
