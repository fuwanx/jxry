name: 小乐

on:
  workflow_dispatch:
  schedule:
     - cron: '0 0-15 * * *'
  watch:
    types: started
jobs:
  build:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env:
        XL_URL: ${{ secrets.XL_URL }}
        XL_HEADER: ${{ secrets.XL_HEADER }}  
        
    steps:
      - name: Checkout
        run: |
          git clone https://github.com/fuwanx/haoyangmao.git ~/haoyangmao
      - name: Use Node.js 12.x
        uses: actions/setup-node@v1
        with:
          node-version: 12.x
      - name: npm install
        if: env.XL_URL
        run: |
          cd ~/bbb
          git checkout ZIYE
          npm install
      - name: '运行 【小乐】'
        if: env.XL_URL
        run: |
          cd ~/haoyangmao
          node haoyangmao/xiaole.js
        env:
          
          PUSH_KEY: ${{ secrets.PUSH_KEY }}
          BARK_PUSH: ${{ secrets.BARK_PUSH }}
          TG_BOT_TOKEN: ${{ secrets.TG_BOT_TOKEN }}
          TG_USER_ID: ${{ secrets.TG_USER_ID }}
          BARK_SOUND: ${{ secrets.BARK_SOUND }}
          DD_BOT_TOKEN: ${{ secrets.DD_BOT_TOKEN }}
          DD_BOT_SECRET: ${{ secrets.DD_BOT_SECRET }}
