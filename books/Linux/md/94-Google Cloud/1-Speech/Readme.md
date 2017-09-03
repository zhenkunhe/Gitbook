# Basic

tags: Google Cloud,Speech,API

<!--sec data-title="Request" data-id="1" data-nopdf="true" data-collapse=false ces-->

{
  "config": {
      "encoding":"FLAC",
      "sample_rate": 16000
  },
  "audio": {
      "uri":"gs://cloud-samples-tests/speech/brooklyn.flac"
  }
}

<!--endsec-->

<!--sec data-title="授權" data-id="2" data-nopdf="true" data-collapse=false ces-->

1. 建立資料庫
`$ gcloud auth activate-service-account --key-file=service-account-key-file`
from json file:
{
  "type": "service_account",
  "project_id": "zhenkun-957",
  "private_key_id": "d19f1f372bdb4493f05fd8d636aa3218f0b9c2a1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDDTnzisZPMhds6\nYUvlyuIUXmB84/zONIkvKLIGhkDXpkmWF6xDGV76RBSMTPu3PGJBwB1hFE2Xetqa\nnTo0nDFetZe6oVb8g6Yr1aHtSTAYIdtrQIwSXDZaX+6eiY7tA8hy2oXZERWoVbio\nTVnI4Ga+5hcqeGGRj31IXmm6z1254o3uOBq6+6Q3GmghjTPcVJyxRdpztWbivJuY\n9CWOqAKZTFTSJ4qPTb7V4smUdYkdWPXdfbKLFs3fy8rES4C7lQNQ57LS36MnxcPm\niQuuRzDvGdLkOVosTJ3qLDMDGmR8WPau6SGNURNFyNPRjCcTkrntgNbT8y/QqPCE\ni0P6KenLAgMBAAECggEAZdR0dNXVk9tu1F+KbQN9INWcRUGxu+nUZQw41gIFqOqA\nj4tEO6/sv1vjwssYqw8Gw/Vg3A7z7bkWZWr4wBl3/EN+GsaoTfxuFYjLZqa0NsDg\nYGlFHwWJKVG/XlWmeZlxV8Dr7KNlwWEAaG/8Eio+J+Zbyb7+UCCaV7MyOT6JRbMa\nyiEVTX7JZ/l1c7AhrJ5s8UaZtcxSNNlhV4hC+zJ8DU4eq3bu+66xvit0io6Ymmog\nDT7chh2SP25b95TUSnZfAxWvvC532viDonyYwYZ9CWt+aBNkWGTuIFZYd6IeC4vH\nKbLH7f3qbLVFrFQZKQb0urCumWkHFS7ndFYY6TdaQQKBgQDkCwF6L4zMShB96WG7\nVv8XUJptqd54QVWtlVdeYgdN7TGYescDifQyd33ufDahiTrHv0W0ih4QQQeZd77f\np/QYuVHdFhMm9UYZq2iVAYBTE9FhomG1rn7BfzTvJI8VEQcAlHMDHn7qtGDtuI5v\nHjyZPW92ewnp450bEMZ/L/6pGwKBgQDbQBHQ4N7bO07j32SvIazlO1z2O5jeaLxt\nLPiQyWxfYq6Y2PnPNW+BCM/Zvv45sqJ4NANyBE/1k9qCE+OkRgeLic9Sbz2VWC4x\nZKzp00awqnJLM4jDnVXw4FijtN6bsJeSPVRRZwAgP0vcb51gO/CRkG0gzMUCJvWI\ncM4f0nP9EQKBgQDPkMTzdjxt5ixErxzp7DGcAx3NG4UHaFCYAwrXOdr0LyWpaHek\n3PiMxv61CBKhzcrW7V6BCgZ7PPWx1rDB2pnvtx6wYdtk5nO8Aazbk9Y9yBgZCjht\nqjpt3V9NHLWvsyPwfy6AdE2JTE29kvLyaU83HBhMe4l2flsNu6MxOXpOaQKBgQCa\nQiPG0NA7cyj4Ts6qIYlh5zhqzlep9ArOzZs9U1p6ahXp2I86aKBBKxACZcy8j6Cb\n7gyWhc40PIi6iH/brqHUXWuO1lF/6ADoI6s9ALd1yRaNLn8FEofK6C21UKZm6AJc\nk+XlOBDwn1giii0x7jo+UF1XfHsIHp0WGDgOT6Xn4QKBgQDetLe431FFDbYmsdAd\nSov8Dy8loxRhkeGUxf7qWrf3cI4/fKqmT29L0NjayEglQTd3V6aF2OhjX/gOo1Vf\nQcQvolD1efN+D66rRpwSPSzQ2oDPXwWyCdJr7I24zjjvbfG/pCkrdqAk1zwUxx81\nAHo1qvXT+fDb1ZM2U90PPieptQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "zhenkun@zhenkun-957.iam.gserviceaccount.com",
  "client_id": "103111512865080355330",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/zhenkun%40zhenkun-957.iam.gserviceaccount.com"
}
由這個取出這六個參數(surface/auth/activate_service_account.py)
  "client_id": "103111512865080355330",
  "client_email": "zhenkun@zhenkun-957.iam.gserviceaccount.com",
  "private_key_id": "d19f1f372bdb4493f05fd8d636aa3218f0b9c2a1",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDDTnzisZPMhds6\nYUvlyuIUXmB84/zONIkvKLIGhkDXpkmWF6xDGV76RBSMTPu3PGJBwB1hFE2Xetqa\nnTo0nDFetZe6oVb8g6Yr1aHtSTAYIdtrQIwSXDZaX+6eiY7tA8hy2oXZERWoVbio\nTVnI4Ga+5hcqeGGRj31IXmm6z1254o3uOBq6+6Q3GmghjTPcVJyxRdpztWbivJuY\n9CWOqAKZTFTSJ4qPTb7V4smUdYkdWPXdfbKLFs3fy8rES4C7lQNQ57LS36MnxcPm\niQuuRzDvGdLkOVosTJ3qLDMDGmR8WPau6SGNURNFyNPRjCcTkrntgNbT8y/QqPCE\ni0P6KenLAgMBAAECggEAZdR0dNXVk9tu1F+KbQN9INWcRUGxu+nUZQw41gIFqOqA\nj4tEO6/sv1vjwssYqw8Gw/Vg3A7z7bkWZWr4wBl3/EN+GsaoTfxuFYjLZqa0NsDg\nYGlFHwWJKVG/XlWmeZlxV8Dr7KNlwWEAaG/8Eio+J+Zbyb7+UCCaV7MyOT6JRbMa\nyiEVTX7JZ/l1c7AhrJ5s8UaZtcxSNNlhV4hC+zJ8DU4eq3bu+66xvit0io6Ymmog\nDT7chh2SP25b95TUSnZfAxWvvC532viDonyYwYZ9CWt+aBNkWGTuIFZYd6IeC4vH\nKbLH7f3qbLVFrFQZKQb0urCumWkHFS7ndFYY6TdaQQKBgQDkCwF6L4zMShB96WG7\nVv8XUJptqd54QVWtlVdeYgdN7TGYescDifQyd33ufDahiTrHv0W0ih4QQQeZd77f\np/QYuVHdFhMm9UYZq2iVAYBTE9FhomG1rn7BfzTvJI8VEQcAlHMDHn7qtGDtuI5v\nHjyZPW92ewnp450bEMZ/L/6pGwKBgQDbQBHQ4N7bO07j32SvIazlO1z2O5jeaLxt\nLPiQyWxfYq6Y2PnPNW+BCM/Zvv45sqJ4NANyBE/1k9qCE+OkRgeLic9Sbz2VWC4x\nZKzp00awqnJLM4jDnVXw4FijtN6bsJeSPVRRZwAgP0vcb51gO/CRkG0gzMUCJvWI\ncM4f0nP9EQKBgQDPkMTzdjxt5ixErxzp7DGcAx3NG4UHaFCYAwrXOdr0LyWpaHek\n3PiMxv61CBKhzcrW7V6BCgZ7PPWx1rDB2pnvtx6wYdtk5nO8Aazbk9Y9yBgZCjht\nqjpt3V9NHLWvsyPwfy6AdE2JTE29kvLyaU83HBhMe4l2flsNu6MxOXpOaQKBgQCa\nQiPG0NA7cyj4Ts6qIYlh5zhqzlep9ArOzZs9U1p6ahXp2I86aKBBKxACZcy8j6Cb\n7gyWhc40PIi6iH/brqHUXWuO1lF/6ADoI6s9ALd1yRaNLn8FEofK6C21UKZm6AJc\nk+XlOBDwn1giii0x7jo+UF1XfHsIHp0WGDgOT6Xn4QKBgQDetLe431FFDbYmsdAd\nSov8Dy8loxRhkeGUxf7qWrf3cI4/fKqmT29L0NjayEglQTd3V6aF2OhjX/gOo1Vf\nQcQvolD1efN+D66rRpwSPSzQ2oDPXwWyCdJr7I24zjjvbfG/pCkrdqAk1zwUxx81\nAHo1qvXT+fDb1ZM2U90PPieptQ==\n-----END PRIVATE KEY-----\n"
"scopes" : ""('https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/cloud-platform', 'https://www.googleapis.com/auth/appengine.admin', 'https://www.googleapis.com/auth/compute')""
""user_agent":""google-cloud-sdk"

建立出(surface/auth/activate_service_account.py)
{
  "service_account_name": "zhenkun@zhenkun-957.iam.gserviceaccount.com",
  "_service_account_id": "103111512865080355330",
  "id_token": null,
  "_token_uri": "https://accounts.google.com/o/oauth2/token",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "_private_key_id": "d19f1f372bdb4493f05fd8d636aa3218f0b9c2a1",
  "token_response": null,
  "client_id": null,
  "token_expiry": null,
  "_class": "ServiceAccountCredentials",
  "refresh_token": null,
  "_module": "googlecloudsdk.core.credentials.service_account",
  "_private_key_pkcs8_text": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDDTnzisZPMhds6\nYUvlyuIUXmB84/zONIkvKLIGhkDXpkmWF6xDGV76RBSMTPu3PGJBwB1hFE2Xetqa\nnTo0nDFetZe6oVb8g6Yr1aHtSTAYIdtrQIwSXDZaX+6eiY7tA8hy2oXZERWoVbio\nTVnI4Ga+5hcqeGGRj31IXmm6z1254o3uOBq6+6Q3GmghjTPcVJyxRdpztWbivJuY\n9CWOqAKZTFTSJ4qPTb7V4smUdYkdWPXdfbKLFs3fy8rES4C7lQNQ57LS36MnxcPm\niQuuRzDvGdLkOVosTJ3qLDMDGmR8WPau6SGNURNFyNPRjCcTkrntgNbT8y/QqPCE\ni0P6KenLAgMBAAECggEAZdR0dNXVk9tu1F+KbQN9INWcRUGxu+nUZQw41gIFqOqA\nj4tEO6/sv1vjwssYqw8Gw/Vg3A7z7bkWZWr4wBl3/EN+GsaoTfxuFYjLZqa0NsDg\nYGlFHwWJKVG/XlWmeZlxV8Dr7KNlwWEAaG/8Eio+J+Zbyb7+UCCaV7MyOT6JRbMa\nyiEVTX7JZ/l1c7AhrJ5s8UaZtcxSNNlhV4hC+zJ8DU4eq3bu+66xvit0io6Ymmog\nDT7chh2SP25b95TUSnZfAxWvvC532viDonyYwYZ9CWt+aBNkWGTuIFZYd6IeC4vH\nKbLH7f3qbLVFrFQZKQb0urCumWkHFS7ndFYY6TdaQQKBgQDkCwF6L4zMShB96WG7\nVv8XUJptqd54QVWtlVdeYgdN7TGYescDifQyd33ufDahiTrHv0W0ih4QQQeZd77f\np/QYuVHdFhMm9UYZq2iVAYBTE9FhomG1rn7BfzTvJI8VEQcAlHMDHn7qtGDtuI5v\nHjyZPW92ewnp450bEMZ/L/6pGwKBgQDbQBHQ4N7bO07j32SvIazlO1z2O5jeaLxt\nLPiQyWxfYq6Y2PnPNW+BCM/Zvv45sqJ4NANyBE/1k9qCE+OkRgeLic9Sbz2VWC4x\nZKzp00awqnJLM4jDnVXw4FijtN6bsJeSPVRRZwAgP0vcb51gO/CRkG0gzMUCJvWI\ncM4f0nP9EQKBgQDPkMTzdjxt5ixErxzp7DGcAx3NG4UHaFCYAwrXOdr0LyWpaHek\n3PiMxv61CBKhzcrW7V6BCgZ7PPWx1rDB2pnvtx6wYdtk5nO8Aazbk9Y9yBgZCjht\nqjpt3V9NHLWvsyPwfy6AdE2JTE29kvLyaU83HBhMe4l2flsNu6MxOXpOaQKBgQCa\nQiPG0NA7cyj4Ts6qIYlh5zhqzlep9ArOzZs9U1p6ahXp2I86aKBBKxACZcy8j6Cb\n7gyWhc40PIi6iH/brqHUXWuO1lF/6ADoI6s9ALd1yRaNLn8FEofK6C21UKZm6AJc\nk+XlOBDwn1giii0x7jo+UF1XfHsIHp0WGDgOT6Xn4QKBgQDetLe431FFDbYmsdAd\nSov8Dy8loxRhkeGUxf7qWrf3cI4/fKqmT29L0NjayEglQTd3V6aF2OhjX/gOo1Vf\nQcQvolD1efN+D66rRpwSPSzQ2oDPXwWyCdJr7I24zjjvbfG/pCkrdqAk1zwUxx81\nAHo1qvXT+fDb1ZM2U90PPieptQ==\n-----END PRIVATE KEY-----\n",
  "access_token": null,
  "_kwargs": {
    
  },
  "_user_agent": "google-cloud-sdk",
  "invalid": false,
  "_service_account_email": "zhenkun@zhenkun-957.iam.gserviceaccount.com",
  "_revoke_uri": "https://accounts.google.com/o/oauth2/revoke",
  "assertion_type": null,
  "_scopes": "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/appengine.admin https://www.googleapis.com/auth/compute",
  "client_secret": null,
  "revoke_uri": "https://accounts.google.com/o/oauth2/revoke",
  "user_agent": "google-cloud-sdk"
}

2. 取得access token(third_party/oauth2client/service_account.py)
`$ gcloud auth print-access-token`
`access_token`
{
  'alg': 'RS256',
  'typ': 'JWT',
  'kid': 'd19f1f372bdb4493f05fd8d636aa3218f0b9c2a1'
}
{
  'iss': 'zhenkun@zhenkun-957.iam.gserviceaccount.com',
  'scope': 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/cloud-platform https://www.googleapis.com/auth/appengine.admin https://www.googleapis.com/auth/compute',
  'aud': 'https://accounts.google.com/o/oauth2/token',
  'exp': 1471940749,
  'iat': 1471937149
}

<!--endsec-->