---
author: ROYIANS
title: 为个人博客添加 DocSearch（自行抓取网页并建立索引）
cc: 原创
tag: [教程, 建站, docsearch]
keywords: ROYIANS,小梦岛,为个人博客添加DocSearch,教程,建站,docsearch
comment: true
recommend: false
date: 2023-04-24
abbrlink: 2023042401
cover: https://img.vidorra.life/images/covers/2023/04/2401.webp
archive: true
---

之前用过 Algolia 服务（Free Plan），使用效果很好。但是展示的搜索结果并不是结构化的。最近网上冲浪的时候发现了一个项目，可以使 Algolia 的搜索结果更具有结构化。

如果你的博客网站偏技术教程或者你单纯想让搜索结果看起来更容易阅读，可以试试使用这个 DocSearch。

[DocSearch](https://docsearch.algolia.com/) 是一款 Algolia 出品的，为文档添加搜索功能的项目。本文默认你已经知道并使用过 Algolia，但是没有使用过 DocSearch，介绍如何搭建项目自助抓取博客网页并建立索引。

## 申请免费的 DocSearch 服务

当然，DocSearch 为满足申请条件的人群提供了免费的服务，可以进入官网点击 Apply 按钮申请。具体申请条件如下：

> - 必须是网站的所有者，或者至少有权限更新网站内容，因为需要通过 script 嵌入 DocSearch 代码。
> - 网站必须公共可见，DocSearch 服务不会为需要权限认证或者私网部署的项目建立索引。
> - 网站必须是一个开源项目的文档网站，或者是一个技术博客。
> - 一定是上线的网站，有内容的网站。

填写基本信息后之后通过邮件沟通，工作人员就会提供可供使用的索引，以及访问所需的 API key 等信息。

但是对于我来说，我的博客虽然也有技术内容，可是我打算以后向其他方向发展，比如文学之类。这个时候可能不太满足申请条件了。DocSearch V2 版本提供了自己搭建爬取服务的教程，因此我选择自己搭建服务抓取网页生成索引。

## 自助的 DocSearch

需要说明的是，目前最新版本的 DocSearch V3 已经不支持自助，只能通过申请来搭建服务了，因此我们使用的是 V2 版本，这个版本已经不再维护了。

[Run Your Own](https://docsearch.algolia.com/docs/legacy/run-your-own)，通过官方文档，我们开始部署自己的服务。

### 设置环境

首先要设置环境，将我们 Algolia 的 API 信息存储到环境变量中去。这里就首先了解具体的这两个环境变量，至于设置，我们在运行代码的时候再操作。

- APPLICATION_ID: Algolia 的 ApplicationId。Algolia -> Settings -> Team and Access -> API Keys -> Application ID
- API_KEY: Algolia 的 ApplicationId。Algolia -> Settings -> Team and Access -> API Keys -> Admin API Key

注意 API_KEY 需要具有写权限的 Admin API Key，因此项目最好运行在本地，最起码确保该 KEY 不会泄露。

## 下载代码并运行

按照文档，有两种运行方式，一种是 Docker，一种是下载代码运行。Docker 由于我的服务器又特别拉跨，因此就放弃了。但是肯定是要比代码方式更快更简单的。

第二种方法就是下载代码自己运行。

1. 克隆仓库：[docsearch-scraper](https://github.com/algolia/docsearch-scraper)
2. 安装 pipenv：pip install --user pipenv
3. 添加环境变量（这一步是为了让 pipenv 可以直接在命令行里用）
   1. `C:\Users\你的用户名\AppData\Roaming\Python\Python310\site-packages` Python310 具体看你安装的 python 版本
   2. `C:\Users\你的用户名\AppData\Roaming\Python\Python310\Scripts`
4. 然后终端测试下 pipenv 命令
5. 移动到仓库目录，运行 `pipenv install`
6. 仓库目录下运行 `pipenv shell`
7. 仓库根目录下创建 `.env` 文件，文件内容就是在[设置环境](#设置环境)中提到的两个信息。
8. 运行 `pipenv run python ./docsearch bootstrap` 按提示输入你博客的地址和 Algolia 的索引名称，会帮你建立一个 config.json 文件。
9. 修改 config.json 文件的配置
10. 运行 `pipenv run python ./docsearch run ./config.json`
11. 查看控制台输出，应该大功告成了

## 遇到的问题

在如上步骤中遇到的问题记录如下。

### .env 文件的内容

```text
APPLICATION_ID=XXX
API_KEY=XXX
```

### pipenv install 失败

按照仓库代码默认提供的 `Pipfile.lock` 文件安装，会失败，具体原因我也没太看懂，我通过 `pipenv install --skip-lock` 命令安装后成功了，但是运行第十步的时候报错了，因为安装的依赖版本太高了，代码内使用的部分 API 失效的原因。

通过不断降级，我最终试出来一个好用的版本，安装前你们可以替换下 lock 文件试试。

Pipfile.lock
```json
{
    "_meta": {
        "hash": {
            "sha256": "2e6dcf2aa0122997de0fd45c55e4856e7df449c9f92ec4c66a762139ce52b940"
        },
        "pipfile-spec": 6,
        "requires": {
            "python_version": "3.6"
        },
        "sources": [
            {
                "name": "pypi",
                "url": "https://pypi.org/simple",
                "verify_ssl": true
            }
        ]
    },
    "default": {
        "algoliasearch": {
            "hashes": [
                "sha256:0647732a91549132514ba5263cb12c7cc443baeb54bd52d324f84f6acd845ac1",
                "sha256:9706d1238ad912e87a9fb43791399de47fe559afd32964e91dfc69a7ca3fe0ce"
            ],
            "index": "pypi",
            "version": "==2.6.3"
        },
        "atomicwrites": {
            "hashes": [
                "sha256:81b2c9071a49367a7f770170e5eec8cb66567cfbbc8c73d20ce5ca4a8d71cf11"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3'",
            "version": "==1.4.1"
        },
        "attrs": {
            "hashes": [
                "sha256:1f28b4522cdc2fb4256ac1a020c78acf9cba2c6b461ccd2c126f3aa8e8335d04",
                "sha256:6279836d581513a26f1bf235f9acd333bc9115683f14f7e8fae46c98fc50e015"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==23.1.0"
        },
        "automat": {
            "hashes": [
                "sha256:c3164f8742b9dc440f3682482d32aaff7bb53f71740dd018533f9de286b64180",
                "sha256:e56beb84edad19dcc11d30e8d9b895f75deeb5ef5e96b84a467066b3b84bb04e"
            ],
            "version": "==22.10.0"
        },
        "certifi": {
            "hashes": [
                "sha256:35824b4c3a97115964b408844d64aa14db1cc518f6562e8d7261699d1350a9e3",
                "sha256:4ad3232f5e926d6718ec31cfc1fcadfde020920e278684144551c91769c7bc18"
            ],
            "markers": "python_version >= '3.6'",
            "version": "==2022.12.7"
        },
        "cffi": {
            "hashes": [
                "sha256:00a9ed42e88df81ffae7a8ab6d9356b371399b91dbdf0c3cb1e84c03a13aceb5",
                "sha256:03425bdae262c76aad70202debd780501fabeaca237cdfddc008987c0e0f59ef",
                "sha256:04ed324bda3cda42b9b695d51bb7d54b680b9719cfab04227cdd1e04e5de3104",
                "sha256:0e2642fe3142e4cc4af0799748233ad6da94c62a8bec3a6648bf8ee68b1c7426",
                "sha256:173379135477dc8cac4bc58f45db08ab45d228b3363adb7af79436135d028405",
                "sha256:198caafb44239b60e252492445da556afafc7d1e3ab7a1fb3f0584ef6d742375",
                "sha256:1e74c6b51a9ed6589199c787bf5f9875612ca4a8a0785fb2d4a84429badaf22a",
                "sha256:2012c72d854c2d03e45d06ae57f40d78e5770d252f195b93f581acf3ba44496e",
                "sha256:21157295583fe8943475029ed5abdcf71eb3911894724e360acff1d61c1d54bc",
                "sha256:2470043b93ff09bf8fb1d46d1cb756ce6132c54826661a32d4e4d132e1977adf",
                "sha256:285d29981935eb726a4399badae8f0ffdff4f5050eaa6d0cfc3f64b857b77185",
                "sha256:30d78fbc8ebf9c92c9b7823ee18eb92f2e6ef79b45ac84db507f52fbe3ec4497",
                "sha256:320dab6e7cb2eacdf0e658569d2575c4dad258c0fcc794f46215e1e39f90f2c3",
                "sha256:33ab79603146aace82c2427da5ca6e58f2b3f2fb5da893ceac0c42218a40be35",
                "sha256:3548db281cd7d2561c9ad9984681c95f7b0e38881201e157833a2342c30d5e8c",
                "sha256:3799aecf2e17cf585d977b780ce79ff0dc9b78d799fc694221ce814c2c19db83",
                "sha256:39d39875251ca8f612b6f33e6b1195af86d1b3e60086068be9cc053aa4376e21",
                "sha256:3b926aa83d1edb5aa5b427b4053dc420ec295a08e40911296b9eb1b6170f6cca",
                "sha256:3bcde07039e586f91b45c88f8583ea7cf7a0770df3a1649627bf598332cb6984",
                "sha256:3d08afd128ddaa624a48cf2b859afef385b720bb4b43df214f85616922e6a5ac",
                "sha256:3eb6971dcff08619f8d91607cfc726518b6fa2a9eba42856be181c6d0d9515fd",
                "sha256:40f4774f5a9d4f5e344f31a32b5096977b5d48560c5592e2f3d2c4374bd543ee",
                "sha256:4289fc34b2f5316fbb762d75362931e351941fa95fa18789191b33fc4cf9504a",
                "sha256:470c103ae716238bbe698d67ad020e1db9d9dba34fa5a899b5e21577e6d52ed2",
                "sha256:4f2c9f67e9821cad2e5f480bc8d83b8742896f1242dba247911072d4fa94c192",
                "sha256:50a74364d85fd319352182ef59c5c790484a336f6db772c1a9231f1c3ed0cbd7",
                "sha256:54a2db7b78338edd780e7ef7f9f6c442500fb0d41a5a4ea24fff1c929d5af585",
                "sha256:5635bd9cb9731e6d4a1132a498dd34f764034a8ce60cef4f5319c0541159392f",
                "sha256:59c0b02d0a6c384d453fece7566d1c7e6b7bae4fc5874ef2ef46d56776d61c9e",
                "sha256:5d598b938678ebf3c67377cdd45e09d431369c3b1a5b331058c338e201f12b27",
                "sha256:5df2768244d19ab7f60546d0c7c63ce1581f7af8b5de3eb3004b9b6fc8a9f84b",
                "sha256:5ef34d190326c3b1f822a5b7a45f6c4535e2f47ed06fec77d3d799c450b2651e",
                "sha256:6975a3fac6bc83c4a65c9f9fcab9e47019a11d3d2cf7f3c0d03431bf145a941e",
                "sha256:6c9a799e985904922a4d207a94eae35c78ebae90e128f0c4e521ce339396be9d",
                "sha256:70df4e3b545a17496c9b3f41f5115e69a4f2e77e94e1d2a8e1070bc0c38c8a3c",
                "sha256:7473e861101c9e72452f9bf8acb984947aa1661a7704553a9f6e4baa5ba64415",
                "sha256:8102eaf27e1e448db915d08afa8b41d6c7ca7a04b7d73af6514df10a3e74bd82",
                "sha256:87c450779d0914f2861b8526e035c5e6da0a3199d8f1add1a665e1cbc6fc6d02",
                "sha256:8b7ee99e510d7b66cdb6c593f21c043c248537a32e0bedf02e01e9553a172314",
                "sha256:91fc98adde3d7881af9b59ed0294046f3806221863722ba7d8d120c575314325",
                "sha256:94411f22c3985acaec6f83c6df553f2dbe17b698cc7f8ae751ff2237d96b9e3c",
                "sha256:98d85c6a2bef81588d9227dde12db8a7f47f639f4a17c9ae08e773aa9c697bf3",
                "sha256:9ad5db27f9cabae298d151c85cf2bad1d359a1b9c686a275df03385758e2f914",
                "sha256:a0b71b1b8fbf2b96e41c4d990244165e2c9be83d54962a9a1d118fd8657d2045",
                "sha256:a0f100c8912c114ff53e1202d0078b425bee3649ae34d7b070e9697f93c5d52d",
                "sha256:a591fe9e525846e4d154205572a029f653ada1a78b93697f3b5a8f1f2bc055b9",
                "sha256:a5c84c68147988265e60416b57fc83425a78058853509c1b0629c180094904a5",
                "sha256:a66d3508133af6e8548451b25058d5812812ec3798c886bf38ed24a98216fab2",
                "sha256:a8c4917bd7ad33e8eb21e9a5bbba979b49d9a97acb3a803092cbc1133e20343c",
                "sha256:b3bbeb01c2b273cca1e1e0c5df57f12dce9a4dd331b4fa1635b8bec26350bde3",
                "sha256:cba9d6b9a7d64d4bd46167096fc9d2f835e25d7e4c121fb2ddfc6528fb0413b2",
                "sha256:cc4d65aeeaa04136a12677d3dd0b1c0c94dc43abac5860ab33cceb42b801c1e8",
                "sha256:ce4bcc037df4fc5e3d184794f27bdaab018943698f4ca31630bc7f84a7b69c6d",
                "sha256:cec7d9412a9102bdc577382c3929b337320c4c4c4849f2c5cdd14d7368c5562d",
                "sha256:d400bfb9a37b1351253cb402671cea7e89bdecc294e8016a707f6d1d8ac934f9",
                "sha256:d61f4695e6c866a23a21acab0509af1cdfd2c013cf256bbf5b6b5e2695827162",
                "sha256:db0fbb9c62743ce59a9ff687eb5f4afbe77e5e8403d6697f7446e5f609976f76",
                "sha256:dd86c085fae2efd48ac91dd7ccffcfc0571387fe1193d33b6394db7ef31fe2a4",
                "sha256:e00b098126fd45523dd056d2efba6c5a63b71ffe9f2bbe1a4fe1716e1d0c331e",
                "sha256:e229a521186c75c8ad9490854fd8bbdd9a0c9aa3a524326b55be83b54d4e0ad9",
                "sha256:e263d77ee3dd201c3a142934a086a4450861778baaeeb45db4591ef65550b0a6",
                "sha256:ed9cb427ba5504c1dc15ede7d516b84757c3e3d7868ccc85121d9310d27eed0b",
                "sha256:fa6693661a4c91757f4412306191b6dc88c1703f780c8234035eac011922bc01",
                "sha256:fcd131dd944808b5bdb38e6f5b53013c5aa4f334c5cad0c72742f6eba4b73db0"
            ],
            "version": "==1.15.1"
        },
        "charset-normalizer": {
            "hashes": [
                "sha256:04afa6387e2b282cf78ff3dbce20f0cc071c12dc8f685bd40960cc68644cfea6",
                "sha256:04eefcee095f58eaabe6dc3cc2262f3bcd776d2c67005880894f447b3f2cb9c1",
                "sha256:0be65ccf618c1e7ac9b849c315cc2e8a8751d9cfdaa43027d4f6624bd587ab7e",
                "sha256:0c95f12b74681e9ae127728f7e5409cbbef9cd914d5896ef238cc779b8152373",
                "sha256:0ca564606d2caafb0abe6d1b5311c2649e8071eb241b2d64e75a0d0065107e62",
                "sha256:10c93628d7497c81686e8e5e557aafa78f230cd9e77dd0c40032ef90c18f2230",
                "sha256:11d117e6c63e8f495412d37e7dc2e2fff09c34b2d09dbe2bee3c6229577818be",
                "sha256:11d3bcb7be35e7b1bba2c23beedac81ee893ac9871d0ba79effc7fc01167db6c",
                "sha256:12a2b561af122e3d94cdb97fe6fb2bb2b82cef0cdca131646fdb940a1eda04f0",
                "sha256:12d1a39aa6b8c6f6248bb54550efcc1c38ce0d8096a146638fd4738e42284448",
                "sha256:1435ae15108b1cb6fffbcea2af3d468683b7afed0169ad718451f8db5d1aff6f",
                "sha256:1c60b9c202d00052183c9be85e5eaf18a4ada0a47d188a83c8f5c5b23252f649",
                "sha256:1e8fcdd8f672a1c4fc8d0bd3a2b576b152d2a349782d1eb0f6b8e52e9954731d",
                "sha256:20064ead0717cf9a73a6d1e779b23d149b53daf971169289ed2ed43a71e8d3b0",
                "sha256:21fa558996782fc226b529fdd2ed7866c2c6ec91cee82735c98a197fae39f706",
                "sha256:22908891a380d50738e1f978667536f6c6b526a2064156203d418f4856d6e86a",
                "sha256:3160a0fd9754aab7d47f95a6b63ab355388d890163eb03b2d2b87ab0a30cfa59",
                "sha256:322102cdf1ab682ecc7d9b1c5eed4ec59657a65e1c146a0da342b78f4112db23",
                "sha256:34e0a2f9c370eb95597aae63bf85eb5e96826d81e3dcf88b8886012906f509b5",
                "sha256:3573d376454d956553c356df45bb824262c397c6e26ce43e8203c4c540ee0acb",
                "sha256:3747443b6a904001473370d7810aa19c3a180ccd52a7157aacc264a5ac79265e",
                "sha256:38e812a197bf8e71a59fe55b757a84c1f946d0ac114acafaafaf21667a7e169e",
                "sha256:3a06f32c9634a8705f4ca9946d667609f52cf130d5548881401f1eb2c39b1e2c",
                "sha256:3a5fc78f9e3f501a1614a98f7c54d3969f3ad9bba8ba3d9b438c3bc5d047dd28",
                "sha256:3d9098b479e78c85080c98e1e35ff40b4a31d8953102bb0fd7d1b6f8a2111a3d",
                "sha256:3dc5b6a8ecfdc5748a7e429782598e4f17ef378e3e272eeb1340ea57c9109f41",
                "sha256:4155b51ae05ed47199dc5b2a4e62abccb274cee6b01da5b895099b61b1982974",
                "sha256:49919f8400b5e49e961f320c735388ee686a62327e773fa5b3ce6721f7e785ce",
                "sha256:53d0a3fa5f8af98a1e261de6a3943ca631c526635eb5817a87a59d9a57ebf48f",
                "sha256:5f008525e02908b20e04707a4f704cd286d94718f48bb33edddc7d7b584dddc1",
                "sha256:628c985afb2c7d27a4800bfb609e03985aaecb42f955049957814e0491d4006d",
                "sha256:65ed923f84a6844de5fd29726b888e58c62820e0769b76565480e1fdc3d062f8",
                "sha256:6734e606355834f13445b6adc38b53c0fd45f1a56a9ba06c2058f86893ae8017",
                "sha256:6baf0baf0d5d265fa7944feb9f7451cc316bfe30e8df1a61b1bb08577c554f31",
                "sha256:6f4f4668e1831850ebcc2fd0b1cd11721947b6dc7c00bf1c6bd3c929ae14f2c7",
                "sha256:6f5c2e7bc8a4bf7c426599765b1bd33217ec84023033672c1e9a8b35eaeaaaf8",
                "sha256:6f6c7a8a57e9405cad7485f4c9d3172ae486cfef1344b5ddd8e5239582d7355e",
                "sha256:7381c66e0561c5757ffe616af869b916c8b4e42b367ab29fedc98481d1e74e14",
                "sha256:73dc03a6a7e30b7edc5b01b601e53e7fc924b04e1835e8e407c12c037e81adbd",
                "sha256:74db0052d985cf37fa111828d0dd230776ac99c740e1a758ad99094be4f1803d",
                "sha256:75f2568b4189dda1c567339b48cba4ac7384accb9c2a7ed655cd86b04055c795",
                "sha256:78cacd03e79d009d95635e7d6ff12c21eb89b894c354bd2b2ed0b4763373693b",
                "sha256:80d1543d58bd3d6c271b66abf454d437a438dff01c3e62fdbcd68f2a11310d4b",
                "sha256:830d2948a5ec37c386d3170c483063798d7879037492540f10a475e3fd6f244b",
                "sha256:891cf9b48776b5c61c700b55a598621fdb7b1e301a550365571e9624f270c203",
                "sha256:8f25e17ab3039b05f762b0a55ae0b3632b2e073d9c8fc88e89aca31a6198e88f",
                "sha256:9a3267620866c9d17b959a84dd0bd2d45719b817245e49371ead79ed4f710d19",
                "sha256:a04f86f41a8916fe45ac5024ec477f41f886b3c435da2d4e3d2709b22ab02af1",
                "sha256:aaf53a6cebad0eae578f062c7d462155eada9c172bd8c4d250b8c1d8eb7f916a",
                "sha256:abc1185d79f47c0a7aaf7e2412a0eb2c03b724581139193d2d82b3ad8cbb00ac",
                "sha256:ac0aa6cd53ab9a31d397f8303f92c42f534693528fafbdb997c82bae6e477ad9",
                "sha256:ac3775e3311661d4adace3697a52ac0bab17edd166087d493b52d4f4f553f9f0",
                "sha256:b06f0d3bf045158d2fb8837c5785fe9ff9b8c93358be64461a1089f5da983137",
                "sha256:b116502087ce8a6b7a5f1814568ccbd0e9f6cfd99948aa59b0e241dc57cf739f",
                "sha256:b82fab78e0b1329e183a65260581de4375f619167478dddab510c6c6fb04d9b6",
                "sha256:bd7163182133c0c7701b25e604cf1611c0d87712e56e88e7ee5d72deab3e76b5",
                "sha256:c36bcbc0d5174a80d6cccf43a0ecaca44e81d25be4b7f90f0ed7bcfbb5a00909",
                "sha256:c3af8e0f07399d3176b179f2e2634c3ce9c1301379a6b8c9c9aeecd481da494f",
                "sha256:c84132a54c750fda57729d1e2599bb598f5fa0344085dbde5003ba429a4798c0",
                "sha256:cb7b2ab0188829593b9de646545175547a70d9a6e2b63bf2cd87a0a391599324",
                "sha256:cca4def576f47a09a943666b8f829606bcb17e2bc2d5911a46c8f8da45f56755",
                "sha256:cf6511efa4801b9b38dc5546d7547d5b5c6ef4b081c60b23e4d941d0eba9cbeb",
                "sha256:d16fd5252f883eb074ca55cb622bc0bee49b979ae4e8639fff6ca3ff44f9f854",
                "sha256:d2686f91611f9e17f4548dbf050e75b079bbc2a82be565832bc8ea9047b61c8c",
                "sha256:d7fc3fca01da18fbabe4625d64bb612b533533ed10045a2ac3dd194bfa656b60",
                "sha256:dd5653e67b149503c68c4018bf07e42eeed6b4e956b24c00ccdf93ac79cdff84",
                "sha256:de5695a6f1d8340b12a5d6d4484290ee74d61e467c39ff03b39e30df62cf83a0",
                "sha256:e0ac8959c929593fee38da1c2b64ee9778733cdf03c482c9ff1d508b6b593b2b",
                "sha256:e1b25e3ad6c909f398df8921780d6a3d120d8c09466720226fc621605b6f92b1",
                "sha256:e633940f28c1e913615fd624fcdd72fdba807bf53ea6925d6a588e84e1151531",
                "sha256:e89df2958e5159b811af9ff0f92614dabf4ff617c03a4c1c6ff53bf1c399e0e1",
                "sha256:ea9f9c6034ea2d93d9147818f17c2a0860d41b71c38b9ce4d55f21b6f9165a11",
                "sha256:f645caaf0008bacf349875a974220f1f1da349c5dbe7c4ec93048cdc785a3326",
                "sha256:f8303414c7b03f794347ad062c0516cee0e15f7a612abd0ce1e25caf6ceb47df",
                "sha256:fca62a8301b605b954ad2e9c3666f9d97f63872aa4efcae5492baca2056b74ab"
            ],
            "markers": "python_full_version >= '3.7.0'",
            "version": "==3.1.0"
        },
        "click": {
            "hashes": [
                "sha256:7682dc8afb30297001674575ea00d1814d808d6a36af415a82bd481d37ba7b8e",
                "sha256:bb4d8133cb15a609f44e8213d9b391b0809795062913b383c62be0ee95b1db48"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==8.1.3"
        },
        "colorama": {
            "hashes": [
                "sha256:08695f5cb7ed6e0531a20572697297273c47b8cae5a63ffc6d6ed5c201be6e44",
                "sha256:4f1d9991f5acc0ca119f9d443620b77f9d6b33703e51011c16baf57afb285fc6"
            ],
            "markers": "sys_platform == 'win32'",
            "version": "==0.4.6"
        },
        "constantly": {
            "hashes": [
                "sha256:586372eb92059873e29eba4f9dec8381541b4d3834660707faf8ba59146dfc35",
                "sha256:dd2fa9d6b1a51a83f0d7dd76293d734046aa176e384bf6e33b7e44880eb37c5d"
            ],
            "version": "==15.1.0"
        },
        "cryptography": {
            "hashes": [
                "sha256:0e70da4bdff7601b0ef48e6348339e490ebfb0cbe638e083c9c41fb49f00c8bd",
                "sha256:10652dd7282de17990b88679cb82f832752c4e8237f0c714be518044269415db",
                "sha256:175c1a818b87c9ac80bb7377f5520b7f31b3ef2a0004e2420319beadedb67290",
                "sha256:1d7e632804a248103b60b16fb145e8df0bc60eed790ece0d12efe8cd3f3e7744",
                "sha256:1f13ddda26a04c06eb57119caf27a524ccae20533729f4b1e4a69b54e07035eb",
                "sha256:2ec2a8714dd005949d4019195d72abed84198d877112abb5a27740e217e0ea8d",
                "sha256:2fa36a7b2cc0998a3a4d5af26ccb6273f3df133d61da2ba13b3286261e7efb70",
                "sha256:2fb481682873035600b5502f0015b664abc26466153fab5c6bc92c1ea69d478b",
                "sha256:3178d46f363d4549b9a76264f41c6948752183b3f587666aff0555ac50fd7876",
                "sha256:4367da5705922cf7070462e964f66e4ac24162e22ab0a2e9d31f1b270dd78083",
                "sha256:4eb85075437f0b1fd8cd66c688469a0c4119e0ba855e3fef86691971b887caf6",
                "sha256:50a1494ed0c3f5b4d07650a68cd6ca62efe8b596ce743a5c94403e6f11bf06c1",
                "sha256:53049f3379ef05182864d13bb9686657659407148f901f3f1eee57a733fb4b00",
                "sha256:6391e59ebe7c62d9902c24a4d8bcbc79a68e7c4ab65863536127c8a9cd94043b",
                "sha256:67461b5ebca2e4c2ab991733f8ab637a7265bb582f07c7c88914b5afb88cb95b",
                "sha256:78e47e28ddc4ace41dd38c42e6feecfdadf9c3be2af389abbfeef1ff06822285",
                "sha256:80ca53981ceeb3241998443c4964a387771588c4e4a5d92735a493af868294f9",
                "sha256:8a4b2bdb68a447fadebfd7d24855758fe2d6fecc7fed0b78d190b1af39a8e3b0",
                "sha256:8e45653fb97eb2f20b8c96f9cd2b3a0654d742b47d638cf2897afbd97f80fa6d",
                "sha256:998cd19189d8a747b226d24c0207fdaa1e6658a1d3f2494541cb9dfbf7dcb6d2",
                "sha256:a10498349d4c8eab7357a8f9aa3463791292845b79597ad1b98a543686fb1ec8",
                "sha256:b4cad0cea995af760f82820ab4ca54e5471fc782f70a007f31531957f43e9dee",
                "sha256:bfe6472507986613dc6cc00b3d492b2f7564b02b3b3682d25ca7f40fa3fd321b",
                "sha256:c9e0d79ee4c56d841bd4ac6e7697c8ff3c8d6da67379057f29e66acffcd1e9a7",
                "sha256:ca57eb3ddaccd1112c18fc80abe41db443cc2e9dcb1917078e02dfa010a4f353",
                "sha256:ce127dd0a6a0811c251a6cddd014d292728484e530d80e872ad9806cfb1c5b3c"
            ],
            "index": "pypi",
            "version": "==38.0.4"
        },
        "cssselect": {
            "hashes": [
                "sha256:666b19839cfaddb9ce9d36bfe4c969132c647b92fc9088c4e23f786b30f1b3dc",
                "sha256:da1885f0c10b60c03ed5eccbb6b68d6eff248d91976fcde348f395d54c9fd35e"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==1.2.0"
        },
        "hyperlink": {
            "hashes": [
                "sha256:427af957daa58bc909471c6c40f74c5450fa123dd093fc53efd2e91d2705a56b",
                "sha256:e6b14c37ecb73e89c77d78cdb4c2cc8f3fb59a885c5b3f819ff4ed80f25af1b4"
            ],
            "version": "==21.0.0"
        },
        "idna": {
            "hashes": [
                "sha256:814f528e8dead7d329833b91c5faa87d60bf71824cd12a7530b5526063d02cb4",
                "sha256:90b77e79eaa3eba6de819a0c442c0b4ceefc341a7a2ab77d7562bf49f425c5c2"
            ],
            "markers": "python_version >= '3.5'",
            "version": "==3.4"
        },
        "incremental": {
            "hashes": [
                "sha256:912feeb5e0f7e0188e6f42241d2f450002e11bbc0937c65865045854c24c0bd0",
                "sha256:b864a1f30885ee72c5ac2835a761b8fe8aa9c28b9395cacf27286602688d3e51"
            ],
            "version": "==22.10.0"
        },
        "itemadapter": {
            "hashes": [
                "sha256:2ac1fbcc363b789a18639935ca322e50a65a0a7dfdd8d973c34e2c468e6c0f94",
                "sha256:77758485fb0ac10730d4b131363e37d65cb8db2450bfec7a57c3f3271f4a48a9"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==0.8.0"
        },
        "jmespath": {
            "hashes": [
                "sha256:02e2e4cc71b5bcab88332eebf907519190dd9e6e82107fa7f83b1003a6252980",
                "sha256:90261b206d6defd58fdd5e85f478bf633a2901798906be2ad389150c5c60edbe"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==1.0.1"
        },
        "lxml": {
            "hashes": [
                "sha256:01d36c05f4afb8f7c20fd9ed5badca32a2029b93b1750f571ccc0b142531caf7",
                "sha256:04876580c050a8c5341d706dd464ff04fd597095cc8c023252566a8826505726",
                "sha256:05ca3f6abf5cf78fe053da9b1166e062ade3fa5d4f92b4ed688127ea7d7b1d03",
                "sha256:090c6543d3696cbe15b4ac6e175e576bcc3f1ccfbba970061b7300b0c15a2140",
                "sha256:0dc313ef231edf866912e9d8f5a042ddab56c752619e92dfd3a2c277e6a7299a",
                "sha256:0f2b1e0d79180f344ff9f321327b005ca043a50ece8713de61d1cb383fb8ac05",
                "sha256:13598ecfbd2e86ea7ae45ec28a2a54fb87ee9b9fdb0f6d343297d8e548392c03",
                "sha256:16efd54337136e8cd72fb9485c368d91d77a47ee2d42b057564aae201257d419",
                "sha256:1ab8f1f932e8f82355e75dda5413a57612c6ea448069d4fb2e217e9a4bed13d4",
                "sha256:223f4232855ade399bd409331e6ca70fb5578efef22cf4069a6090acc0f53c0e",
                "sha256:2455cfaeb7ac70338b3257f41e21f0724f4b5b0c0e7702da67ee6c3640835b67",
                "sha256:2899456259589aa38bfb018c364d6ae7b53c5c22d8e27d0ec7609c2a1ff78b50",
                "sha256:2a29ba94d065945944016b6b74e538bdb1751a1db6ffb80c9d3c2e40d6fa9894",
                "sha256:2a87fa548561d2f4643c99cd13131acb607ddabb70682dcf1dff5f71f781a4bf",
                "sha256:2e430cd2824f05f2d4f687701144556646bae8f249fd60aa1e4c768ba7018947",
                "sha256:36c3c175d34652a35475a73762b545f4527aec044910a651d2bf50de9c3352b1",
                "sha256:3818b8e2c4b5148567e1b09ce739006acfaa44ce3156f8cbbc11062994b8e8dd",
                "sha256:3ab9fa9d6dc2a7f29d7affdf3edebf6ece6fb28a6d80b14c3b2fb9d39b9322c3",
                "sha256:3efea981d956a6f7173b4659849f55081867cf897e719f57383698af6f618a92",
                "sha256:4c8f293f14abc8fd3e8e01c5bd86e6ed0b6ef71936ded5bf10fe7a5efefbaca3",
                "sha256:5344a43228767f53a9df6e5b253f8cdca7dfc7b7aeae52551958192f56d98457",
                "sha256:58bfa3aa19ca4c0f28c5dde0ff56c520fbac6f0daf4fac66ed4c8d2fb7f22e74",
                "sha256:5b4545b8a40478183ac06c073e81a5ce4cf01bf1734962577cf2bb569a5b3bbf",
                "sha256:5f50a1c177e2fa3ee0667a5ab79fdc6b23086bc8b589d90b93b4bd17eb0e64d1",
                "sha256:63da2ccc0857c311d764e7d3d90f429c252e83b52d1f8f1d1fe55be26827d1f4",
                "sha256:6749649eecd6a9871cae297bffa4ee76f90b4504a2a2ab528d9ebe912b101975",
                "sha256:6804daeb7ef69e7b36f76caddb85cccd63d0c56dedb47555d2fc969e2af6a1a5",
                "sha256:689bb688a1db722485e4610a503e3e9210dcc20c520b45ac8f7533c837be76fe",
                "sha256:699a9af7dffaf67deeae27b2112aa06b41c370d5e7633e0ee0aea2e0b6c211f7",
                "sha256:6b418afe5df18233fc6b6093deb82a32895b6bb0b1155c2cdb05203f583053f1",
                "sha256:76cf573e5a365e790396a5cc2b909812633409306c6531a6877c59061e42c4f2",
                "sha256:7b515674acfdcadb0eb5d00d8a709868173acece5cb0be3dd165950cbfdf5409",
                "sha256:7b770ed79542ed52c519119473898198761d78beb24b107acf3ad65deae61f1f",
                "sha256:7d2278d59425777cfcb19735018d897ca8303abe67cc735f9f97177ceff8027f",
                "sha256:7e91ee82f4199af8c43d8158024cbdff3d931df350252288f0d4ce656df7f3b5",
                "sha256:821b7f59b99551c69c85a6039c65b75f5683bdc63270fec660f75da67469ca24",
                "sha256:822068f85e12a6e292803e112ab876bc03ed1f03dddb80154c395f891ca6b31e",
                "sha256:8340225bd5e7a701c0fa98284c849c9b9fc9238abf53a0ebd90900f25d39a4e4",
                "sha256:85cabf64adec449132e55616e7ca3e1000ab449d1d0f9d7f83146ed5bdcb6d8a",
                "sha256:880bbbcbe2fca64e2f4d8e04db47bcdf504936fa2b33933efd945e1b429bea8c",
                "sha256:8d0b4612b66ff5d62d03bcaa043bb018f74dfea51184e53f067e6fdcba4bd8de",
                "sha256:8e20cb5a47247e383cf4ff523205060991021233ebd6f924bca927fcf25cf86f",
                "sha256:925073b2fe14ab9b87e73f9a5fde6ce6392da430f3004d8b72cc86f746f5163b",
                "sha256:998c7c41910666d2976928c38ea96a70d1aa43be6fe502f21a651e17483a43c5",
                "sha256:9b22c5c66f67ae00c0199f6055705bc3eb3fcb08d03d2ec4059a2b1b25ed48d7",
                "sha256:9f102706d0ca011de571de32c3247c6476b55bb6bc65a20f682f000b07a4852a",
                "sha256:a08cff61517ee26cb56f1e949cca38caabe9ea9fbb4b1e10a805dc39844b7d5c",
                "sha256:a0a336d6d3e8b234a3aae3c674873d8f0e720b76bc1d9416866c41cd9500ffb9",
                "sha256:a35f8b7fa99f90dd2f5dc5a9fa12332642f087a7641289ca6c40d6e1a2637d8e",
                "sha256:a38486985ca49cfa574a507e7a2215c0c780fd1778bb6290c21193b7211702ab",
                "sha256:a5da296eb617d18e497bcf0a5c528f5d3b18dadb3619fbdadf4ed2356ef8d941",
                "sha256:a6e441a86553c310258aca15d1c05903aaf4965b23f3bc2d55f200804e005ee5",
                "sha256:a82d05da00a58b8e4c0008edbc8a4b6ec5a4bc1e2ee0fb6ed157cf634ed7fa45",
                "sha256:ab323679b8b3030000f2be63e22cdeea5b47ee0abd2d6a1dc0c8103ddaa56cd7",
                "sha256:b1f42b6921d0e81b1bcb5e395bc091a70f41c4d4e55ba99c6da2b31626c44892",
                "sha256:b23e19989c355ca854276178a0463951a653309fb8e57ce674497f2d9f208746",
                "sha256:b264171e3143d842ded311b7dccd46ff9ef34247129ff5bf5066123c55c2431c",
                "sha256:b26a29f0b7fc6f0897f043ca366142d2b609dc60756ee6e4e90b5f762c6adc53",
                "sha256:b64d891da92e232c36976c80ed7ebb383e3f148489796d8d31a5b6a677825efe",
                "sha256:b9cc34af337a97d470040f99ba4282f6e6bac88407d021688a5d585e44a23184",
                "sha256:bc718cd47b765e790eecb74d044cc8d37d58562f6c314ee9484df26276d36a38",
                "sha256:be7292c55101e22f2a3d4d8913944cbea71eea90792bf914add27454a13905df",
                "sha256:c83203addf554215463b59f6399835201999b5e48019dc17f182ed5ad87205c9",
                "sha256:c9ec3eaf616d67db0764b3bb983962b4f385a1f08304fd30c7283954e6a7869b",
                "sha256:ca34efc80a29351897e18888c71c6aca4a359247c87e0b1c7ada14f0ab0c0fb2",
                "sha256:ca989b91cf3a3ba28930a9fc1e9aeafc2a395448641df1f387a2d394638943b0",
                "sha256:d02a5399126a53492415d4906ab0ad0375a5456cc05c3fc0fc4ca11771745cda",
                "sha256:d17bc7c2ccf49c478c5bdd447594e82692c74222698cfc9b5daae7ae7e90743b",
                "sha256:d5bf6545cd27aaa8a13033ce56354ed9e25ab0e4ac3b5392b763d8d04b08e0c5",
                "sha256:d6b430a9938a5a5d85fc107d852262ddcd48602c120e3dbb02137c83d212b380",
                "sha256:da248f93f0418a9e9d94b0080d7ebc407a9a5e6d0b57bb30db9b5cc28de1ad33",
                "sha256:da4dd7c9c50c059aba52b3524f84d7de956f7fef88f0bafcf4ad7dde94a064e8",
                "sha256:df0623dcf9668ad0445e0558a21211d4e9a149ea8f5666917c8eeec515f0a6d1",
                "sha256:e5168986b90a8d1f2f9dc1b841467c74221bd752537b99761a93d2d981e04889",
                "sha256:efa29c2fe6b4fdd32e8ef81c1528506895eca86e1d8c4657fda04c9b3786ddf9",
                "sha256:f1496ea22ca2c830cbcbd473de8f114a320da308438ae65abad6bab7867fe38f",
                "sha256:f49e52d174375a7def9915c9f06ec4e569d235ad428f70751765f48d5926678c"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3, 3.4'",
            "version": "==4.9.2"
        },
        "more-itertools": {
            "hashes": [
                "sha256:cabaa341ad0389ea83c17a94566a53ae4c9d07349861ecb14dc6d0345cf9ac5d",
                "sha256:d2bc7f02446e86a68911e58ded76d6561eea00cddfb2a91e7019bbb586c799f3"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==9.1.0"
        },
        "packaging": {
            "hashes": [
                "sha256:994793af429502c4ea2ebf6bf664629d07c1a9fe974af92966e4b8d2df7edc61",
                "sha256:a392980d2b6cffa644431898be54b0045151319d1e7ec34f0cfed48767dd334f"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==23.1"
        },
        "parsel": {
            "hashes": [
                "sha256:2708fc74daeeb4ce471e2c2e9089b650ec940c7a218053e57421e69b5b00f82c",
                "sha256:aff28e68c9b3f1a901db2a4e3f158d8480a38724d7328ee751c1a4e1c1801e39"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==1.8.1"
        },
        "pluggy": {
            "hashes": [
                "sha256:4224373bacce55f955a878bf9cfa763c1e360858e330072059e10bad68531159",
                "sha256:74134bbf457f031a36d68416e1509f34bd5ccc019f0bcc952c7b909d06b37bd3"
            ],
            "markers": "python_version >= '3.6'",
            "version": "==1.0.0"
        },
        "protego": {
            "hashes": [
                "sha256:04419b18f20e8909f1691c6b678392988271cc2a324a72f9663cb3af838b4bf7",
                "sha256:df666d4304dab774e2dc9feb208bb1ac8d71ea5ceec12f4c99eba30fbd642ff2"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3, 3.4'",
            "version": "==0.2.1"
        },
        "py": {
            "hashes": [
                "sha256:51c75c4126074b472f746a24399ad32f6053d1b34b68d2fa41e558e6f4a98719",
                "sha256:607c53218732647dff4acdfcd50cb62615cedf612e72d1724fb1a0cc6405b378"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3, 3.4'",
            "version": "==1.11.0"
        },
        "pyasn1": {
            "hashes": [
                "sha256:87a2121042a1ac9358cabcaf1d07680ff97ee6404333bacca15f76aa8ad01a57",
                "sha256:97b7290ca68e62a832558ec3976f15cbf911bf5d7c7039d8b861c2a0ece69fde"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3, 3.4, 3.5'",
            "version": "==0.5.0"
        },
        "pyasn1-modules": {
            "hashes": [
                "sha256:5bd01446b736eb9d31512a30d46c1ac3395d676c6f3cafa4c03eb54b9925631c",
                "sha256:d3ccd6ed470d9ffbc716be08bd90efbd44d0734bc9303818f7336070984a162d"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3, 3.4, 3.5'",
            "version": "==0.3.0"
        },
        "pycparser": {
            "hashes": [
                "sha256:8ee45429555515e1f6b185e78100aea234072576aa43ab53aefcae078162fca9",
                "sha256:e644fdec12f7872f86c58ff790da456218b10f863970249516d60a5eaca77206"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3'",
            "version": "==2.21"
        },
        "pydispatcher": {
            "hashes": [
                "sha256:96543bea04115ffde08f851e1d45cacbfd1ee866ac42127d9b476dc5aefa7de0",
                "sha256:b777c6ad080dc1bad74a4c29d6a46914fa6701ac70f94b0d66fbcfde62f5be31"
            ],
            "version": "==2.0.7"
        },
        "pyjwt": {
            "hashes": [
                "sha256:69285c7e31fc44f68a1feb309e948e0df53259d579295e6cfe2b1792329f05fd",
                "sha256:d83c3d892a77bbb74d3e1a2cfa90afaadb60945205d1095d9221f04466f64c14"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==2.6.0"
        },
        "pyopenssl": {
            "hashes": [
                "sha256:660b1b1425aac4a1bea1d94168a85d99f0b3144c869dd4390d27629d0087f1bf",
                "sha256:ea252b38c87425b64116f808355e8da644ef9b07e429398bfece610f893ee2e0"
            ],
            "index": "pypi",
            "version": "==22.0.0"
        },
        "pyperclip": {
            "hashes": [
                "sha256:a3cb6df5d8f1557ca8fc514d94fabf50dc5a97042c90e5ba4f3611864fed3fc5"
            ],
            "index": "pypi",
            "version": "==1.5.27"
        },
        "pytest": {
            "hashes": [
                "sha256:630ff1dbe04f469ee78faa5660f712e58b953da7df22ea5d828c9012e134da43",
                "sha256:a2b5232735dd0b736cbea9c0f09e5070d78fcaba2823a4f6f09d9a81bd19415c"
            ],
            "index": "pypi",
            "version": "==3.10.0"
        },
        "python-dotenv": {
            "hashes": [
                "sha256:45e927c34204c90f5faa35ea8709b894f6b1a7712d77eb50940601068040993b",
                "sha256:dc7940052cfe170e881aea40feb4ea7776e6a97170ed038fd2ee7e26e47585f2"
            ],
            "index": "pypi",
            "version": "==0.7.1"
        },
        "python-helpscout-v2": {
            "hashes": [
                "sha256:7e9ff2a27b3142bbb16d111b05739046dbac1d518b6d6fec9e4b21a341f9f278",
                "sha256:a516d9846d466c26f9a5795b816e453a30023cf5a3739bcac88820e0163602e2"
            ],
            "index": "pypi",
            "version": "==1.0.1"
        },
        "queuelib": {
            "hashes": [
                "sha256:4b207267f2642a8699a1f806045c56eb7ad1a85a10c0e249884580d139c2fcd2",
                "sha256:4b96d48f650a814c6fb2fd11b968f9c46178b683aad96d68f930fe13a8574d19"
            ],
            "markers": "python_version >= '3.5'",
            "version": "==1.6.2"
        },
        "ratelimit": {
            "hashes": [
                "sha256:d001f4dacf4880f64dafb5bc6ef0cc882aa94f291c623bbcf080e0a882e62351"
            ],
            "index": "pypi",
            "version": "==1.4.1"
        },
        "requests": {
            "hashes": [
                "sha256:64299f4909223da747622c030b781c0d7811e359c37124b4bd368fb8c6518baa",
                "sha256:98b1b2782e3c6c4904938b84c0eb932721069dfdb9134313beff7c83c2df24bf"
            ],
            "markers": "python_version >= '3.7' and python_version < '4'",
            "version": "==2.28.2"
        },
        "requests-file": {
            "hashes": [
                "sha256:07d74208d3389d01c38ab89ef403af0cfec63957d53a0081d8eca738d0247d8e",
                "sha256:dfe5dae75c12481f68ba353183c53a65e6044c923e64c24b2209f6c7570ca953"
            ],
            "version": "==1.5.1"
        },
        "requests-iap": {
            "hashes": [
                "sha256:055adfe57d1a2feb0ce25b490fcd33387d1ffc189a2e947f7e089be88efacbe5",
                "sha256:2cf84e1096a7e8b318666a798468be68a43d8bd5cc31a2246770f04a6c27bb2d"
            ],
            "index": "pypi",
            "version": "==0.2.0"
        },
        "scrapy": {
            "hashes": [
                "sha256:6a09beb5190bfdee2d72cf261822eae5d92fe8a86ac9ee1f55fc44b4864ca583",
                "sha256:d9d898739f199bd9f9e2258770d5bfeeb754b6ed4eb84a41c04fd52e9649266d"
            ],
            "index": "pypi",
            "version": "==2.2.1"
        },
        "selenium": {
            "hashes": [
                "sha256:2d7131d7bc5a5b99a2d9b04aaf2612c411b03b8ca1b1ee8d3de5845a9be2cb3c",
                "sha256:deaf32b60ad91a4611b98d8002757f29e6f2c2d5fcaf202e1c9ad06d6772300d"
            ],
            "index": "pypi",
            "version": "==3.141.0"
        },
        "service-identity": {
            "hashes": [
                "sha256:6e6c6086ca271dc11b033d17c3a8bea9f24ebff920c587da090afc9519419d34",
                "sha256:f0b0caac3d40627c3c04d7a51b6e06721857a0e10a8775f2d1d7e72901b3a7db"
            ],
            "version": "==21.1.0"
        },
        "setuptools": {
            "hashes": [
                "sha256:6f0839fbdb7e3cfef1fc38d7954f5c1c26bf4eebb155a55c9bf8faf997b9fb67",
                "sha256:bb16732e8eb928922eabaa022f881ae2b7cdcfaf9993ef1f5e841a96d32b8e0c"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==67.7.1"
        },
        "six": {
            "hashes": [
                "sha256:1e61c37477a1626458e36f7b1d82aa5c9b094fa4802892072e49de9c60c4c926",
                "sha256:8abb2f1d86890a2dfb989f9a77cfcfd3e47c2a354b01111771326f8aa26e0254"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3'",
            "version": "==1.16.0"
        },
        "slacker": {
            "hashes": [
                "sha256:5d54950a1956c6faff3c82cd116aed4436cf0e322a72747d77b9189d5ec7f8cb"
            ],
            "index": "pypi",
            "version": "==0.9.60"
        },
        "tldextract": {
            "hashes": [
                "sha256:6a705710f3a1d5ce8a084c888db7bad7aff1dcdf27962f7c7f7058cc42349212",
                "sha256:796d86aa22c382770b28db45547b298cbf855dcdcd8e1c7264419d96c0f2381a"
            ],
            "index": "pypi",
            "version": "==2.1.0"
        },
        "twisted": {
            "hashes": [
                "sha256:77544a8945cf69b98d2946689bbe0c75de7d145cdf11f391dd487eae8fc95a12",
                "sha256:aab38085ea6cda5b378b519a0ec99986874921ee8881318626b0a3414bb2631e"
            ],
            "index": "pypi",
            "version": "==21.2.0"
        },
        "twisted-iocpsupport": {
            "hashes": [
                "sha256:1bdccbb22199fc69fd7744d6d2dfd22d073c028c8611d994b41d2d2ad0e0f40d",
                "sha256:1dbfac706972bf9ec5ce1ddbc735d2ebba406ad363345df8751ffd5252aa1618",
                "sha256:1ddfc5fa22ec6f913464b736b3f46e642237f17ac41be47eed6fa9bd52f5d0e0",
                "sha256:1ea2c3fbdb739c95cc8b3355305cd593d2c9ec56d709207aa1a05d4d98671e85",
                "sha256:3f39c41c0213a81a9ce0961e30d0d7650f371ad80f8d261007d15a2deb6d5be3",
                "sha256:4f249d0baac836bb431d6fa0178be063a310136bc489465a831e3abd2d7acafd",
                "sha256:67bec1716eb8f466ef366bbf262e1467ecc9e20940111207663ac24049785bad",
                "sha256:6f8c433faaad5d53d30d1da6968d5a3730df415e2efb6864847267a9b51290cd",
                "sha256:7efcdfafb377f32db90f42bd5fc5bb32cd1e3637ee936cdaf3aff4f4786ab3bf",
                "sha256:8faceae553cfadc42ad791b1790e7cdecb7751102608c405217f6a26e877e0c5",
                "sha256:98a6f16ab215f8c1446e9fc60aaed0ab7c746d566aa2f3492a23cea334e6bebb",
                "sha256:a379ef56a576c8090889f74441bc3822ca31ac82253cc61e8d50631bcb0c26d0",
                "sha256:aaca8f30c3b7c80d27a33fe9fe0d0bac42b1b012ddc60f677175c30e1becc1f3",
                "sha256:afb00801fdfbaccf0d0173a722626500023d4a19719ac9f129d1347a32e2fc66",
                "sha256:db11c80054b52dbdea44d63d5474a44c9a6531882f0e2960268b15123088641a",
                "sha256:dff43136c33665c2d117a73706aef6f7d6433e5c4560332a118fe066b16b8695"
            ],
            "markers": "platform_system == 'Windows'",
            "version": "==1.0.3"
        },
        "urllib3": {
            "hashes": [
                "sha256:8a388717b9476f934a21484e8c8e61875ab60644d29b9b39e11e4b9dc1c6b305",
                "sha256:aa751d169e23c7479ce47a0cb0da579e3ede798f994f5816a74e4f4500dcea42"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3, 3.4, 3.5'",
            "version": "==1.26.15"
        },
        "w3lib": {
            "hashes": [
                "sha256:0e1198f1b745195b6b3dd1a4cd66011fbf82f30a4d9dabaee1f9e5c86f020274",
                "sha256:7fd5bd7980a95d1a8185e867d05f68a591aa281a3ded4590d2641d7b09086ed4"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==2.1.1"
        },
        "zope.interface": {
            "hashes": [
                "sha256:042f2381118b093714081fd82c98e3b189b68db38ee7d35b63c327c470ef8373",
                "sha256:0ec9653825f837fbddc4e4b603d90269b501486c11800d7c761eee7ce46d1bbb",
                "sha256:12175ca6b4db7621aedd7c30aa7cfa0a2d65ea3a0105393e05482d7a2d367446",
                "sha256:1592f68ae11e557b9ff2bc96ac8fc30b187e77c45a3c9cd876e3368c53dc5ba8",
                "sha256:23ac41d52fd15dd8be77e3257bc51bbb82469cf7f5e9a30b75e903e21439d16c",
                "sha256:424d23b97fa1542d7be882eae0c0fc3d6827784105264a8169a26ce16db260d8",
                "sha256:4407b1435572e3e1610797c9203ad2753666c62883b921318c5403fb7139dec2",
                "sha256:48f4d38cf4b462e75fac78b6f11ad47b06b1c568eb59896db5b6ec1094eb467f",
                "sha256:4c3d7dfd897a588ec27e391edbe3dd320a03684457470415870254e714126b1f",
                "sha256:5171eb073474a5038321409a630904fd61f12dd1856dd7e9d19cd6fe092cbbc5",
                "sha256:5a158846d0fca0a908c1afb281ddba88744d403f2550dc34405c3691769cdd85",
                "sha256:6ee934f023f875ec2cfd2b05a937bd817efcc6c4c3f55c5778cbf78e58362ddc",
                "sha256:790c1d9d8f9c92819c31ea660cd43c3d5451df1df61e2e814a6f99cebb292788",
                "sha256:809fe3bf1a91393abc7e92d607976bbb8586512913a79f2bf7d7ec15bd8ea518",
                "sha256:87b690bbee9876163210fd3f500ee59f5803e4a6607d1b1238833b8885ebd410",
                "sha256:89086c9d3490a0f265a3c4b794037a84541ff5ffa28bb9c24cc9f66566968464",
                "sha256:99856d6c98a326abbcc2363827e16bd6044f70f2ef42f453c0bd5440c4ce24e5",
                "sha256:aab584725afd10c710b8f1e6e208dbee2d0ad009f57d674cb9d1b3964037275d",
                "sha256:af169ba897692e9cd984a81cb0f02e46dacdc07d6cf9fd5c91e81f8efaf93d52",
                "sha256:b39b8711578dcfd45fc0140993403b8a81e879ec25d53189f3faa1f006087dca",
                "sha256:b3f543ae9d3408549a9900720f18c0194ac0fe810cecda2a584fd4dca2eb3bb8",
                "sha256:d0583b75f2e70ec93f100931660328965bb9ff65ae54695fb3fa0a1255daa6f2",
                "sha256:dfbbbf0809a3606046a41f8561c3eada9db811be94138f42d9135a5c47e75f6f",
                "sha256:e538f2d4a6ffb6edfb303ce70ae7e88629ac6e5581870e66c306d9ad7b564a58",
                "sha256:eba51599370c87088d8882ab74f637de0c4f04a6d08a312dce49368ba9ed5c2a",
                "sha256:ee4b43f35f5dc15e1fec55ccb53c130adb1d11e8ad8263d68b1284b66a04190d",
                "sha256:f2363e5fd81afb650085c6686f2ee3706975c54f331b426800b53531191fdf28",
                "sha256:f299c020c6679cb389814a3b81200fe55d428012c5e76da7e722491f5d205990",
                "sha256:f72f23bab1848edb7472309e9898603141644faec9fd57a823ea6b4d1c4c8995",
                "sha256:fa90bac61c9dc3e1a563e5babb3fd2c0c1c80567e815442ddbe561eadc803b30"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==6.0"
        }
    },
    "develop": {
        "astroid": {
            "hashes": [
                "sha256:44224ad27c54d770233751315fa7f74c46fa3ee0fab7beef1065f99f09897efe",
                "sha256:f11e74658da0f2a14a8d19776a8647900870a63de71db83713a8e77a6af52662"
            ],
            "markers": "python_full_version >= '3.7.2'",
            "version": "==2.15.3"
        },
        "colorama": {
            "hashes": [
                "sha256:08695f5cb7ed6e0531a20572697297273c47b8cae5a63ffc6d6ed5c201be6e44",
                "sha256:4f1d9991f5acc0ca119f9d443620b77f9d6b33703e51011c16baf57afb285fc6"
            ],
            "markers": "sys_platform == 'win32'",
            "version": "==0.4.6"
        },
        "isort": {
            "hashes": [
                "sha256:54da7e92468955c4fceacd0c86bd0ec997b0e1ee80d97f67c35a78b719dccab1",
                "sha256:6e811fcb295968434526407adb8796944f1988c5b65e8139058f2014cbe100fd"
            ],
            "markers": "python_version >= '2.7' and python_version not in '3.0, 3.1, 3.2, 3.3'",
            "version": "==4.3.21"
        },
        "lazy-object-proxy": {
            "hashes": [
                "sha256:09763491ce220c0299688940f8dc2c5d05fd1f45af1e42e636b2e8b2303e4382",
                "sha256:0a891e4e41b54fd5b8313b96399f8b0e173bbbfc03c7631f01efbe29bb0bcf82",
                "sha256:189bbd5d41ae7a498397287c408617fe5c48633e7755287b21d741f7db2706a9",
                "sha256:18b78ec83edbbeb69efdc0e9c1cb41a3b1b1ed11ddd8ded602464c3fc6020494",
                "sha256:1aa3de4088c89a1b69f8ec0dcc169aa725b0ff017899ac568fe44ddc1396df46",
                "sha256:212774e4dfa851e74d393a2370871e174d7ff0ebc980907723bb67d25c8a7c30",
                "sha256:2d0daa332786cf3bb49e10dc6a17a52f6a8f9601b4cf5c295a4f85854d61de63",
                "sha256:5f83ac4d83ef0ab017683d715ed356e30dd48a93746309c8f3517e1287523ef4",
                "sha256:659fb5809fa4629b8a1ac5106f669cfc7bef26fbb389dda53b3e010d1ac4ebae",
                "sha256:660c94ea760b3ce47d1855a30984c78327500493d396eac4dfd8bd82041b22be",
                "sha256:66a3de4a3ec06cd8af3f61b8e1ec67614fbb7c995d02fa224813cb7afefee701",
                "sha256:721532711daa7db0d8b779b0bb0318fa87af1c10d7fe5e52ef30f8eff254d0cd",
                "sha256:7322c3d6f1766d4ef1e51a465f47955f1e8123caee67dd641e67d539a534d006",
                "sha256:79a31b086e7e68b24b99b23d57723ef7e2c6d81ed21007b6281ebcd1688acb0a",
                "sha256:81fc4d08b062b535d95c9ea70dbe8a335c45c04029878e62d744bdced5141586",
                "sha256:8fa02eaab317b1e9e03f69aab1f91e120e7899b392c4fc19807a8278a07a97e8",
                "sha256:9090d8e53235aa280fc9239a86ae3ea8ac58eff66a705fa6aa2ec4968b95c821",
                "sha256:946d27deaff6cf8452ed0dba83ba38839a87f4f7a9732e8f9fd4107b21e6ff07",
                "sha256:9990d8e71b9f6488e91ad25f322898c136b008d87bf852ff65391b004da5e17b",
                "sha256:9cd077f3d04a58e83d04b20e334f678c2b0ff9879b9375ed107d5d07ff160171",
                "sha256:9e7551208b2aded9c1447453ee366f1c4070602b3d932ace044715d89666899b",
                "sha256:9f5fa4a61ce2438267163891961cfd5e32ec97a2c444e5b842d574251ade27d2",
                "sha256:b40387277b0ed2d0602b8293b94d7257e17d1479e257b4de114ea11a8cb7f2d7",
                "sha256:bfb38f9ffb53b942f2b5954e0f610f1e721ccebe9cce9025a38c8ccf4a5183a4",
                "sha256:cbf9b082426036e19c6924a9ce90c740a9861e2bdc27a4834fd0a910742ac1e8",
                "sha256:d9e25ef10a39e8afe59a5c348a4dbf29b4868ab76269f81ce1674494e2565a6e",
                "sha256:db1c1722726f47e10e0b5fdbf15ac3b8adb58c091d12b3ab713965795036985f",
                "sha256:e7c21c95cae3c05c14aafffe2865bbd5e377cfc1348c4f7751d9dc9a48ca4bda",
                "sha256:e8c6cfb338b133fbdbc5cfaa10fe3c6aeea827db80c978dbd13bc9dd8526b7d4",
                "sha256:ea806fd4c37bf7e7ad82537b0757999264d5f70c45468447bb2b91afdbe73a6e",
                "sha256:edd20c5a55acb67c7ed471fa2b5fb66cb17f61430b7a6b9c3b4a1e40293b1671",
                "sha256:f0117049dd1d5635bbff65444496c90e0baa48ea405125c088e93d9cf4525b11",
                "sha256:f0705c376533ed2a9e5e97aacdbfe04cecd71e0aa84c7c0595d02ef93b6e4455",
                "sha256:f12ad7126ae0c98d601a7ee504c1122bcef553d1d5e0c3bfa77b16b3968d2734",
                "sha256:f2457189d8257dd41ae9b434ba33298aec198e30adf2dcdaaa3a28b9994f6adb",
                "sha256:f699ac1c768270c9e384e4cbd268d6e67aebcfae6cd623b4d7c3bfde5a35db59"
            ],
            "markers": "python_version >= '3.7'",
            "version": "==1.9.0"
        },
        "mccabe": {
            "hashes": [
                "sha256:ab8a6258860da4b6677da4bd2fe5dc2c659cff31b3ee4f7f5d64e79735b80d42",
                "sha256:dd8d182285a0fe56bace7f45b5e7d1a6ebcbf524e8f3bd87eb0f125271b8831f"
            ],
            "version": "==0.6.1"
        },
        "pylint": {
            "hashes": [
                "sha256:5d77031694a5fb97ea95e828c8d10fc770a1df6eb3906067aaed42201a8a6a09",
                "sha256:723e3db49555abaf9bf79dc474c6b9e2935ad82230b10c1138a71ea41ac0fff1"
            ],
            "index": "pypi",
            "version": "==2.3.1"
        },
        "typing-extensions": {
            "hashes": [
                "sha256:5cb5f4a79139d699607b3ef622a1dedafa84e115ab0024e0d9c044a9479ca7cb",
                "sha256:fb33085c39dd998ac16d1431ebc293a8b3eedd00fd4a32de0ff79002c19511b4"
            ],
            "markers": "python_version < '3.11'",
            "version": "==4.5.0"
        },
        "wrapt": {
            "hashes": [
                "sha256:02fce1852f755f44f95af51f69d22e45080102e9d00258053b79367d07af39c0",
                "sha256:077ff0d1f9d9e4ce6476c1a924a3332452c1406e59d90a2cf24aeb29eeac9420",
                "sha256:078e2a1a86544e644a68422f881c48b84fef6d18f8c7a957ffd3f2e0a74a0d4a",
                "sha256:0970ddb69bba00670e58955f8019bec4a42d1785db3faa043c33d81de2bf843c",
                "sha256:1286eb30261894e4c70d124d44b7fd07825340869945c79d05bda53a40caa079",
                "sha256:21f6d9a0d5b3a207cdf7acf8e58d7d13d463e639f0c7e01d82cdb671e6cb7923",
                "sha256:230ae493696a371f1dbffaad3dafbb742a4d27a0afd2b1aecebe52b740167e7f",
                "sha256:26458da5653aa5b3d8dc8b24192f574a58984c749401f98fff994d41d3f08da1",
                "sha256:2cf56d0e237280baed46f0b5316661da892565ff58309d4d2ed7dba763d984b8",
                "sha256:2e51de54d4fb8fb50d6ee8327f9828306a959ae394d3e01a1ba8b2f937747d86",
                "sha256:2fbfbca668dd15b744418265a9607baa970c347eefd0db6a518aaf0cfbd153c0",
                "sha256:38adf7198f8f154502883242f9fe7333ab05a5b02de7d83aa2d88ea621f13364",
                "sha256:3a8564f283394634a7a7054b7983e47dbf39c07712d7b177b37e03f2467a024e",
                "sha256:3abbe948c3cbde2689370a262a8d04e32ec2dd4f27103669a45c6929bcdbfe7c",
                "sha256:3bbe623731d03b186b3d6b0d6f51865bf598587c38d6f7b0be2e27414f7f214e",
                "sha256:40737a081d7497efea35ab9304b829b857f21558acfc7b3272f908d33b0d9d4c",
                "sha256:41d07d029dd4157ae27beab04d22b8e261eddfc6ecd64ff7000b10dc8b3a5727",
                "sha256:46ed616d5fb42f98630ed70c3529541408166c22cdfd4540b88d5f21006b0eff",
                "sha256:493d389a2b63c88ad56cdc35d0fa5752daac56ca755805b1b0c530f785767d5e",
                "sha256:4ff0d20f2e670800d3ed2b220d40984162089a6e2c9646fdb09b85e6f9a8fc29",
                "sha256:54accd4b8bc202966bafafd16e69da9d5640ff92389d33d28555c5fd4f25ccb7",
                "sha256:56374914b132c702aa9aa9959c550004b8847148f95e1b824772d453ac204a72",
                "sha256:578383d740457fa790fdf85e6d346fda1416a40549fe8db08e5e9bd281c6a475",
                "sha256:58d7a75d731e8c63614222bcb21dd992b4ab01a399f1f09dd82af17bbfc2368a",
                "sha256:5c5aa28df055697d7c37d2099a7bc09f559d5053c3349b1ad0c39000e611d317",
                "sha256:5fc8e02f5984a55d2c653f5fea93531e9836abbd84342c1d1e17abc4a15084c2",
                "sha256:63424c681923b9f3bfbc5e3205aafe790904053d42ddcc08542181a30a7a51bd",
                "sha256:64b1df0f83706b4ef4cfb4fb0e4c2669100fd7ecacfb59e091fad300d4e04640",
                "sha256:74934ebd71950e3db69960a7da29204f89624dde411afbfb3b4858c1409b1e98",
                "sha256:75669d77bb2c071333417617a235324a1618dba66f82a750362eccbe5b61d248",
                "sha256:75760a47c06b5974aa5e01949bf7e66d2af4d08cb8c1d6516af5e39595397f5e",
                "sha256:76407ab327158c510f44ded207e2f76b657303e17cb7a572ffe2f5a8a48aa04d",
                "sha256:76e9c727a874b4856d11a32fb0b389afc61ce8aaf281ada613713ddeadd1cfec",
                "sha256:77d4c1b881076c3ba173484dfa53d3582c1c8ff1f914c6461ab70c8428b796c1",
                "sha256:780c82a41dc493b62fc5884fb1d3a3b81106642c5c5c78d6a0d4cbe96d62ba7e",
                "sha256:7dc0713bf81287a00516ef43137273b23ee414fe41a3c14be10dd95ed98a2df9",
                "sha256:7eebcdbe3677e58dd4c0e03b4f2cfa346ed4049687d839adad68cc38bb559c92",
                "sha256:896689fddba4f23ef7c718279e42f8834041a21342d95e56922e1c10c0cc7afb",
                "sha256:96177eb5645b1c6985f5c11d03fc2dbda9ad24ec0f3a46dcce91445747e15094",
                "sha256:96e25c8603a155559231c19c0349245eeb4ac0096fe3c1d0be5c47e075bd4f46",
                "sha256:9d37ac69edc5614b90516807de32d08cb8e7b12260a285ee330955604ed9dd29",
                "sha256:9ed6aa0726b9b60911f4aed8ec5b8dd7bf3491476015819f56473ffaef8959bd",
                "sha256:a487f72a25904e2b4bbc0817ce7a8de94363bd7e79890510174da9d901c38705",
                "sha256:a4cbb9ff5795cd66f0066bdf5947f170f5d63a9274f99bdbca02fd973adcf2a8",
                "sha256:a74d56552ddbde46c246b5b89199cb3fd182f9c346c784e1a93e4dc3f5ec9975",
                "sha256:a89ce3fd220ff144bd9d54da333ec0de0399b52c9ac3d2ce34b569cf1a5748fb",
                "sha256:abd52a09d03adf9c763d706df707c343293d5d106aea53483e0ec8d9e310ad5e",
                "sha256:abd8f36c99512755b8456047b7be10372fca271bf1467a1caa88db991e7c421b",
                "sha256:af5bd9ccb188f6a5fdda9f1f09d9f4c86cc8a539bd48a0bfdc97723970348418",
                "sha256:b02f21c1e2074943312d03d243ac4388319f2456576b2c6023041c4d57cd7019",
                "sha256:b06fa97478a5f478fb05e1980980a7cdf2712015493b44d0c87606c1513ed5b1",
                "sha256:b0724f05c396b0a4c36a3226c31648385deb6a65d8992644c12a4963c70326ba",
                "sha256:b130fe77361d6771ecf5a219d8e0817d61b236b7d8b37cc045172e574ed219e6",
                "sha256:b56d5519e470d3f2fe4aa7585f0632b060d532d0696c5bdfb5e8319e1d0f69a2",
                "sha256:b67b819628e3b748fd3c2192c15fb951f549d0f47c0449af0764d7647302fda3",
                "sha256:ba1711cda2d30634a7e452fc79eabcadaffedf241ff206db2ee93dd2c89a60e7",
                "sha256:bbeccb1aa40ab88cd29e6c7d8585582c99548f55f9b2581dfc5ba68c59a85752",
                "sha256:bd84395aab8e4d36263cd1b9308cd504f6cf713b7d6d3ce25ea55670baec5416",
                "sha256:c99f4309f5145b93eca6e35ac1a988f0dc0a7ccf9ccdcd78d3c0adf57224e62f",
                "sha256:ca1cccf838cd28d5a0883b342474c630ac48cac5df0ee6eacc9c7290f76b11c1",
                "sha256:cd525e0e52a5ff16653a3fc9e3dd827981917d34996600bbc34c05d048ca35cc",
                "sha256:cdb4f085756c96a3af04e6eca7f08b1345e94b53af8921b25c72f096e704e145",
                "sha256:ce42618f67741d4697684e501ef02f29e758a123aa2d669e2d964ff734ee00ee",
                "sha256:d06730c6aed78cee4126234cf2d071e01b44b915e725a6cb439a879ec9754a3a",
                "sha256:d5fe3e099cf07d0fb5a1e23d399e5d4d1ca3e6dfcbe5c8570ccff3e9208274f7",
                "sha256:d6bcbfc99f55655c3d93feb7ef3800bd5bbe963a755687cbf1f490a71fb7794b",
                "sha256:d787272ed958a05b2c86311d3a4135d3c2aeea4fc655705f074130aa57d71653",
                "sha256:e169e957c33576f47e21864cf3fc9ff47c223a4ebca8960079b8bd36cb014fd0",
                "sha256:e20076a211cd6f9b44a6be58f7eeafa7ab5720eb796975d0c03f05b47d89eb90",
                "sha256:e826aadda3cae59295b95343db8f3d965fb31059da7de01ee8d1c40a60398b29",
                "sha256:eef4d64c650f33347c1f9266fa5ae001440b232ad9b98f1f43dfe7a79435c0a6",
                "sha256:f2e69b3ed24544b0d3dbe2c5c0ba5153ce50dcebb576fdc4696d52aa22db6034",
                "sha256:f87ec75864c37c4c6cb908d282e1969e79763e0d9becdfe9fe5473b7bb1e5f09",
                "sha256:fbec11614dba0424ca72f4e8ba3c420dba07b4a7c206c8c8e4e73f2e98f4c559",
                "sha256:fd69666217b62fa5d7c6aa88e507493a34dec4fa20c5bd925e4bc12fce586639"
            ],
            "markers": "python_version < '3.11'",
            "version": "==1.15.0"
        }
    }
}
```

## config.json 的配置

具体的配置项见[这里](https://docsearch.algolia.com/docs/legacy/config-file)，我这里不再赘述了，这个文件要一点一点调试，才能达到满意的效果。

最好有个 sitemap，这样就不用写很多 url 了。

```json
   {
     "index_name": "LittleDreamland",
     "sitemap_urls": [
       "http://blog.vidorra.life/sitemap.xml"
     ],
     "start_urls": [
       "http://blog.vidorra.life/"
     ],
     "stop_urls": [
       "https://blog.vidorra.life/tags/.*",
       "https://blog.vidorra.life/categories/.*"
     ],
     "selectors": {
       "lvl0": "#article-title",
       "lvl1": ".post-content h2",
       "lvl2": ".post-content h3",
       "lvl3": ".post-content h4",
       "lvl4": ".post-content h5",
       "lvl5": ".post-content h6",
       "text": ".post-content p, .post-content li"
     },
     "nb_hits": 224
   }
```

## 前端项目开发

抓取成功后，我们还需要把 DocSearch 嵌入到自己的博客中。我是静态网页，没有使用 React 框架。如果你使用 React 框架，请参考官方网站的配置。

### head 引入样式和 JS

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@docsearch/css@3" />
<script src="https://cdn.jsdelivr.net/npm/@docsearch/js@3"></script>
```

我这里用的是 V3 版本的代码，好像也没有什么问题，不过当然最好还是和后端匹配下，使用 V2 版本。

另外我 CSS 使用的是自己的，自定义样式可以更方便的使 DocSearch 融入博客中，当然原生的样式也好看。

### body 中创建一个 div 用于存放搜索框

```html
<div id="docsearch" class="hidden"></div>
```

这里我将它默认隐藏了，因为我使用另一个自定义的搜索框触发搜索事件

### 编写脚本创建示例

```javascript
(() => {
   docsearch({
      appId: '<%= config.algolia.appId %>',
      apiKey: '<%= config.algolia.apiKey %>',
      indexName: '<%= config.algolia.indexName %>',
      container: '#docsearch',
      placeholder: '<%= _p('search.title') %>...',
      ......
   })

   const searchClickFn = () => {
      document.querySelector('#algolia_search').addEventListener('click', () => {
         document.querySelector('.DocSearch-Button').click()
      })
   }

   searchClickFn()
})()
```

这里的配置项我也配置好多，主要是实现样式的修改。具体我怎么配的可以直接查看源码。可以参考官方文档的 API 学习如何配置，这里我也就不再赘述了。

## 参考
- [DocSearch Document](https://docsearch.algolia.com/docs/legacy/dropdown/)
