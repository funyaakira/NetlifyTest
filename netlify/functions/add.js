// Netlify関数のエントリーポイント
exports.handler = async (event, context) => {
  
  // POSTリクエスト以外は無視
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed'
    };
  }

  try {
    // POSTされたJSONデータをパース（解析）する
    // bodyが空の場合も考慮
    let data;
    if (event.body) {
      data = JSON.parse(event.body);
    } else {
      data = {};
    }

    // JSONから数値を取り出す (文字列で来る可能性があるのでparseFloat)
    const num1 = parseFloat(data.num1 || 0);
    const num2 = parseFloat(data.num2 || 0);

    // 足し算を実行
    const resultSum = num1 + num2;

    // 結果をJSON形式で（文字列化して）返す
    const responseBody = {
      sum: resultSum
    };

    return {
      statusCode: 200,
      body: JSON.stringify(responseBody)
    };

  } catch (error) {
    // エラーハンドリング
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message })
    };
  }
};