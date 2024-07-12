# Thirdweb Web3 DApp Demo
This is a Web3 DApp demo that uses Thirdweb libraries for token transfers, swaps, an API backend and more, based on a fork of a Thirdweb example app only for swap transactions, that was developed in Next.js with TypeScript and Tailwind. 

Since it was my first time using this framework, including TS and Tailwind, you will find components and functions written in JavaScript and styles in plain CSS. At some point, when I have more time, I will work on standardizing the code.

I was motivated to develop this demo project by my interest in testing the Thirdweb libraries for Web3, which I learned about at a Megacamp by Andino Labs in Peru (https://bootcamp.andinolabs.io/). I find them very interesting and effective in facilitating the development of DApps with less friction for new users.

While these libraries are phenomenal, I have noticed a lack of comprehensive documentation and examples. As a result, I spent a significant amount of time researching and testing functions and their properties, of which I only used a few in this code

## Built With
- NextJs (initial fork used TypeScript and Tailwind)
- JavaScript
- CSS
- Ant design /antd libraries (Tabs, Table, Tooltip, Button, Popconfirm)
- PostgreSql DB

## Live Demo
[Link to live Demo](https://dapp-demo-using-thirdweb-lib.vercel.app/)

(You can use the following test credentials -> user: carlos
password: 666666)

## Video preview
Soon

## Getting Started
- To get a local copy up, clone the repo like this: 
​
  git clone https://github.com/cmolinan/DApp-Demo-using-Thirdweb-lib

  

- Before you begin, you must create an .env file based on the provided example (.env.example) and fill in the values. The most important are:

1) NEXT_PUBLIC_CLIENT_ID=

Enter your Client_id to be able to use the Thirdweb SDK.
See the Creating a Client guide to see how you can obtain a Client ID. https://portal.thirdweb.com/typescript/v5/client

2) Parameters for the PostgreSql Database
If you don't have one, you could get one for free at vercel.com


```bash
pnpm install
pnpm run dev
```


## Authors
👤 **Carlos Molina**
- GitHub: https://github.com/cmolinan
- LinkedIn: [Carlos Molina](https://www.linkedin.com/in/carlosmolinan/)

👤 **Thirdweb**
https://github.com/thirdweb-example/thirdweb-uniswap


## �� Contributing
Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.
Feel free to check the [issues page](../../issues/).
