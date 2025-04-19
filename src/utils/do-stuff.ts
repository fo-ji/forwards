// なんの関数かわからない名前
export function doStuff(data: any) {
  // なんとなく全部まとめて処理している
  if (data && data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const item = data[i];
      // コンソールに出力（副作用）
      console.log('Processing item:', item);

      if (item.isActive) {
        item.updatedAt = new Date().toISOString();
      } else {
        // 削除処理も一緒にやる（責任が混在）
        data.splice(i, 1);
        i--;
      }
    }
  } else {
    console.log('No data found');
  }

  // 処理結果を返さずにそのまま書き換えている
}
