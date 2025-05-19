# 祝日API

祝日APIは内閣府が提供している[祝日情報](https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html)を元に、指定した範囲の祝日を取得できます。

## 範囲指定

`query` に `from` と `to` を `YYYY-MM-DD` 形式で指定して、取得する祝日の範囲を指定します。

取得できる祝日の範囲は昭和30年（1955年）から翌年までです。この範囲を超える指定をした場合、エラーにはなりませんが範囲外の祝日はレスポンスに含まれません。

以下の記載にある通り、毎月2月に翌年の祝日を更新します。

> ※令和8年（2026年）の国民の祝日は、前年（令和7年（2025年））の２月に掲載します。
>
> [国民の祝日について \- 内閣府](https://www8.cao.go.jp/chosei/shukujitsu/gaiyou.html)より引用。

## Content-Type

エンドポイントを変更することで、レスポンスのContent-Typeを変更できます。

対応しているものは以下の通りです。

- `application/json`
- `text/csv`
- `text/xml`

### JSON

`https://jpcal.rest/v1/holiday.json` にGETリクエストを送信すると、JSON形式で祝日を取得できます。

#### Request

```bash
curl 'https://jpcal.rest/v1/holiday.json?from=2024-01-01&to=2024-05-31'
```

### Response

```json
[
    {
        "date": "2024-01-01",
        "name": "元日"
    },
    {
        "date": "2024-01-08",
        "name": "成人の日"
    },
    {
        "date": "2024-02-11",
        "name": "建国記念の日"
    },
    {
        "date": "2024-02-12",
        "name": "建国記念の日 振替休日"
    },
    {
        "date": "2024-02-23",
        "name": "天皇誕生日"
    },
    {
        "date": "2024-03-20",
        "name": "春分の日"
    },
    {
        "date": "2024-04-29",
        "name": "昭和の日"
    },
    {
        "date": "2024-05-03",
        "name": "憲法記念日"
    },
    {
        "date": "2024-05-04",
        "name": "みどりの日"
    },
    {
        "date": "2024-05-05",
        "name": "こどもの日"
    },
    {
        "date": "2024-05-06",
        "name": "こどもの日 振替休日"
    }
]
```

### CSV

`https://jpcal.rest/v1/holiday.csv` にGETリクエストを送信すると、CSV形式で祝日を取得できます。

#### Request

```bash
curl 'https://jpcal.rest/v1/holiday.csv?from=2024-01-01&to=2024-05-31'
```

#### Response

```csv
date,name
2024-01-01,元日
2024-01-08,成人の日
2024-02-11,建国記念の日
2024-02-12,建国記念の日 振替休日
2024-02-23,天皇誕生日
2024-03-20,春分の日
2024-04-29,昭和の日
2024-05-03,憲法記念日
2024-05-04,みどりの日
2024-05-05,こどもの日
2024-05-06,こどもの日 振替休日
```

### XML

`https://jpcal.rest/v1/holiday.xml` にGETリクエストを送信すると、XML形式で祝日を取得できます。

#### Request

```bash
curl 'https://jpcal.rest/v1/holiday.xml?from=2024-01-01&to=2024-05-31'
```

#### Response

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Holidays>
    <Holiday>
        <Date>2024-01-01</Date>
        <Name>元日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-01-08</Date>
        <Name>成人の日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-02-11</Date>
        <Name>建国記念の日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-02-12</Date>
        <Name>建国記念の日 振替休日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-02-23</Date>
        <Name>天皇誕生日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-03-20</Date>
        <Name>春分の日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-04-29</Date>
        <Name>昭和の日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-05-03</Date>
        <Name>憲法記念日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-05-04</Date>
        <Name>みどりの日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-05-05</Date>
        <Name>こどもの日</Name>
    </Holiday>
    <Holiday>
        <Date>2024-05-06</Date>
        <Name>こどもの日 振替休日</Name>
    </Holiday>
</Holidays>
```
