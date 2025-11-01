import json

def handler(event, context):
    # PWAからのPOSTリクエスト以外は無視
    if event['httpMethod'] != 'POST':
        return {
            'statusCode': 405,
            'body': 'Method Not Allowed'
        }

    try:
        # POSTされたJSONデータを読み込む
        data = json.loads(event['body'])
        
        # JSONから数値を取り出す (文字列で来る可能性があるのでfloatに変換)
        num1 = float(data.get('num1', 0))
        num2 = float(data.get('num2', 0))
        
        # 足し算を実行
        result_sum = num1 + num2
        
        # 結果をJSON形式で返す
        response_body = {
            'sum': result_sum
        }
        
        return {
            'statusCode': 200,
            'body': json.dumps(response_body)
        }
        
    except Exception as e:
        # エラーハンドリング
        return {
            'statusCode': 400,
            'body': json.dumps({'error': str(e)})
        }