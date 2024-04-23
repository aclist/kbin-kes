function sa (toggle) { // eslint-disable-line no-unused-vars
    const bua = []
    const M = 'NS84KNCkq7awmxkyAg';
    const ka = [
        "2d3c515a6b232218055213570b0a0e1c61143e3a5647",
        "157d4f553f2d2b452c",
        "3d265f55396e270e17520f13080a",
        "21365514202b37045150141a00110e0a",
        "2d315c142c3b2e06185212",
        "282654582621350214",
        "282654586b232c1d185241180314021724",
        "3d364a42222d26185f511016430d095724033b",
        "2f3d594024233a4b1e5904",
        "28365d50383e220814190818",
        "2c2641143d2b3102175e0413",
        "2f204b5d383aa905125e00570e19071d240e3c324b",
        "232a4b51283b310e015f000500190800",
        "393b5940223d331e0356171e1b1d",
        "283f5d4c232b2207055f151e1d0b"
    ]
    const ia = [
        "5d357756d3a9de5a6034400649c62532ae2b25a5",
        "3e9ec8530f2ced931492c4f33691c03c9f1b7318",
        "a8b3aa882b351b11559996074cf9d5961c53c975",
        "3156dccaee84ac1e51a6fcf1343f398a60a80b9b",
        "480f4838ec53c103f218963d22546ea07d674ef8",
        "d9da9b632c2742f5889ca9871bf2db04559ab124",
        "1ccbee952e74074d68a1d1065bb6c94822de0691",
        "cf0ef57038c3ff0a51252260963413e7a5be2a7e",
        "0ffc6199e0ffe54d80ed846ea4323bab602d78c4",
        "b11159bb95f0881c360bf388dfbd8da0c0a6e4b7",
        "f4604636055a70ebb345709e8343999b370319f3",
        "c642d9066dc1bc0371efb1d9699c321212bbdca6",
        "11580750893726c86d30741a2f68fc2b9a7060ed",
        "e96e068943320a68f827168f4e65f018307653b4",
        "933473666f972c8cf4c845ad430dbd7d4b384e94",
        "d9250cf89557f17424011ab9ee4b5a3b92712737",
        "1ccbee952e74074d68a1d1065bb6c94822de0691",
        "dd88608b49ec582f55d6b47f2e654f6902bceed5",
        "fd63bfe693307157460c1e59591c3cbd3a7ce271",
        "0396f14b7b4c1a00e1932a6e17c814149f1d22b9",
        "12237ef716fdbe1bdabec5203cdc1dae62f21739",
        "f48576aca2d3892b23799469a1027b814fccf74c",
        "da1199334d1dbc1f0ff0360f55c62489ce967cfc",
        "43be8d4d7a5c86c82447a288a0b6ed09a4762744",
        "173d8c575433ce6e98df6ad9af0446e9f1bb33d2",
        "ae813ca0c4736f847669b1a657a2dc25258e8fb1",
        "5ca205ce1fd711c6cab98489e228df8960c387ce",
        "55389bf106e8aa2504c7f260fe0ef35a21d50860",
        "9db7a034f8deaa13e6e482382960f9cae348a82c",
        "d78b794a4f626a9432e1e744ab4709f8977a7ff6",
        "a8b3aa882b351b11559996074cf9d5961c53c975"
    ];
    const ua = [
        "0e215d593f2f30020156131e1e38001b280960205757222f2f",
        "0e215d57393b2a1f1c520f030c1f0e17220e2b20785f29272d450258021e0c14",
        "0e30575022202a13315c031e03561816220e2f3f",
        "0e30505d263e0300135e0f591e170810200b",
        "0e3e5f5822212d2b1a550819430b041a280622",
        "0e324e5526212e5d48770a150416450a2e04273254",
        "0e21594d2a0e280918594f04021b02182d",
        "0e3b59462f272d0c1b5213051438001b280960205757222f2f",
        "0e3d51512726260a15770a150416450a2e04273254",
        "0e2359407a7c705f44770a150416451a29063a",
        "0e2b5e502c2a2503155007152d1309102f493d3c5b5d2a22",
        "0e32565d262f37021e5951462d1309102f493d3c5b5d2a22",
        "0e3850552727275a41065737061a02176f142130515527",
        "0e24594d39272403055a04131e38001b280960205757222f2f",
        "0e205d41220e280918594f04021b02182d",
        "0e055d5a3e3d111e135504051e38001b280960205757222f2f",
        "0e205746282b310e034d14402d1309102f493d3c5b5d2a22",
        "0e355d52242c225a40005837061a02176f142130515527",
        "0e3e5d50223a220505521207021c081832130e385a5d25603004125e001b",
        "0e3254562a22312b1a550819430b041a280622",
        "0e38594039272d0a02420f1e2d1309102f493d3c5b5d2a22",
        "0e21595e2a3b282b1a550819430b041a280622",
        "0e215147202f2f021f560f1e1e192b12230e207d4b5b28272207",
        "0e315d5a222a220110540a37061a02176f0426324c",
        "0e3c5a55262f26061c56211c0f11055732082d3a5958",
        "0e3a5655253a22051958001a0c112b12230e207d4b5b28272207",
        "0e375c522d280300135e0f591e170810200b",
        "0e314d4d332f2d0a09580f1b04160e48010c2c3a561a38212002105b",
        "0e2451582727220614540918140b0f392a05273d1647242d2a0a1d",
        "0e375e472f280300135e0f591e170810200b",
        "0e355f5c3f3c2b0d16770a150416450a2e04273254",
        "0e2a4d5f223b2f04185b211c0f11055732082d3a5958",
        "0e2b51442a24265846005837061a02176f0426324c",
        "0e355f5c2d292108315c031e03561816220e2f3f",
        "0e355f5c2d292d091255211c0f11055732082d3a5958",
        "0e3955552e3d20040752211c0f11055732082d3a5958",
        "0e06485d250733021f770a150416450a2e04273254",
        "0e375d5f243d370a315c031e03561816220e2f3f",
        "0e125653222b3a3b104508040538001b280960205757222f2f",
        "0e354a512f232a0014770a150416450a2e04273254",
        "0e3d4d4d2a3a2a1a10770a150416450a2e04273254",
        "0e11515b1c272d1f1445584e2d1309102f493d3c5b5d2a22",
        "0e3e595c2a202a121e5a211c0f11055732082d3a5958",
        "0e3f594639372e0a034308192d1309102f493d3c5b5d2a22",
        "0e124a40222d2f0e13581537061a02176f142130515527",
        "0e175942222a0607184d0015080c03392a05273d1647242d2a0a1d",
        "0e32545d282b2909105c04050638001b280960205757222f2f",
        "0e314d4d662f370207560f5a021607102f0263364044392b30185c56155a0938001b280960205757222f2f",
        "0e2157512f2b311910591837061a02176f142130515527",
        "0e104a4d3b3a2c381956131c2d1309102f493d3c5b5d2a22",
        "0e39574624377a5c43065137061a02176f142130515527",
        "0e314d4d2a23210214590e190111051c36272531515a653d2c0818560d",
        "0e314d4d6623260f18540819080b46162f0b273d5d74202c2a055f440e14041907",
        "0e34505323292b2b1a550819430b041a280622",
        "0e3b594638272d02480f211c0f11055732082d3a5958",
        "0e29594e3d2b312b1a550819430b041a280622",
        "0e3e59582a272d02141a2d12084e5e4b010c2c3a561a2826221f",
        "0e3c545d3d2722594501211c0f110557220f2f27",
        "0e314d4d6638220718420c5a5c48061e6c08203f515a2e6320031456111b1438001b280960205757222f2f",
        "0e204a5d392f2e2b1a550819430b041a280622",
        "0e314d4d332f2d0a09580f1b04160e1b341e0e385a5d25603004125e001b",
        "0e305046223d370e1d5b041603012b12230e207d4b5b28272207",
        "0e3256413826220c044715162d1309102f493d3c5b5d2a22",
        "0e1d51582f3e742b1a550819430b041a280622",
        "0e1b7a750b2521021f1912180e110a15",
        "0e395d522d3c261202430e1c080b2b1c2f0322364b473f2f2f005f581310",
        "0e16545d2a20224635560d15144e5341010c2c3a561a2826221f",
        "0e204c513b262205055f0e1a0c0b2b12230e207d4b5b28272207",
        "0e355f5c2d292108315c031e03561816220e2f3f",
        "0e39574624377a5c43065137061a02176f0426324c",
        "0e3b5d55273a2b021f510e125f38001b280960205757222f2f",
        "0e3b5d55273a2b021f510e125c492b12230e207d4b5b28272207",
        "0e3e5158272b314619580e135a4a5e392a05273d1657232f37",
        "0e125a5d2c2f2a075c40081b01110a1473507c13535622206d08195615",
        "0e3c5a55262f0300135e0f590e100a0d",
        "0e2b51442a24265846005837061a02176f142130515527",
        "0e3f5d4222242c051f770a150416450a2e04273254",
        "0e315d5a222a220110540a37061a02176f142130515527",
        "0e325c55272f2d0c1445211c0f11055732082d3a5958",
        "0e16545d2a20224635560d15144e5341010c2c3a561a38212002105b",
        "0e2a57522e22261c315c031e03561816220e2f3f",
        "0e205b5c2e2a360714530505181f18392a05273d1647242d2a0a1d",
        "0e275d5f2a3e2a5e43025437061a02176f142130515527",
        "0e30515f2a24225244015437061a02176f142130515527",
        "0e035940297b765e44025437061a02176f142130515527",
        "0e3e5158272b314619580e135a4a5e392a05273d1647242d2a0a1d",
        "0e3e5147202f2f0202560019040b0a392a05273d1647242d2a0a1d",
        "0e215d5c243b30021f5011160e130e0b325f7666785f29272d450258021e0c14",
        "0e315d5a253729091d560a122d1309102f493d3c5b5d2a22",
        "0e640a042a3e310212581537061a02176f142130515527",
        "0e29514d2a232203105c56445d482b12230e207d4b5b28272207",
        "0e3e51453e2b2607105a0e0504162b12230e207d4b5b28272207",
        "0e325456292b311f40055237061a02176f142130515527",
        "0e355d58223e260a195212042d1309102f493d3c5b5d2a22",
        "0e375946272f310e0552191e2d1309102f493d3c5b5d2a22",
        "0e39575c24380300135e0f591e170810200b",
        "0e115d5222292e0a1f440937061a02176f142130515527"
    ]
    const da = [
        "223c4a402a2c",
        "29365651392720",
        "2d3f575a2a34261b105a",
        "2a36555139212f",
        "3b3f4c462a23",
        "23364c5c2a2a2c0514",
        "3e364a57242d261f",
        "29325a553b2b2d1f1859",
        "3c3c405d282127041f52",
        "2a3a594e2e3e2206",
        "223c4a572e3a",
        "2d324a5d382133191e530e1b",
        "212b4157242a2c0514",
        "2f2048552f212f",
        "2f3f48462a342c07105a",
        "3832545d3e23",
        "283a5746222d261f",
        "3c3a4c5527272d",
        "212b4157242037021f",
        "233c5c552d272d021d",
        "253f575a243e2a05",
        "3632565533",
        "2f2751422a20",
        "223c4a55312b330a1c",
        "3e21574222292a07",
        "262a5c46242d2c0f1e5904",
        "3c3a4c5527272d",
        "2f375c51392f2f07",
        "3832545d3e23",
        "2a3a54553e2a2a0f",
        "382a4e55253d26",
        "383a5b5b2f272d",
        "2f3751442e36",
        "3632595a2a36",
        "22265651383a22",
        "2f3e5a5d2e20",
        "3d265a5b33212d0e",
        "3d265a413f2b3b",
        "3a2159592a2a2c07",
        "29325a553b2b2d1f1859",
        "20364d46242037021f",
        "2f305d402a232a051e47091203",
        "3a324851253a220f1e5b",
        "343c5444222a2606"
    ]

    const pa = [
        "29364c",
        "21215c5139",
        "2c2641",
        "2c26415d2529",
        "3e264a57232f300e",
        "29364c"
    ]

    function apply () {
        check();
    }
    function unapply () {
        return
    }

    async function rbi (a) {
        let i = a.querySelector('.thumb-subject')
        if (!i) return
        i = i.src
        const response = await fetch(i);
        if (response.status !== 200) return
        const ab = await response.arrayBuffer();
        const hb = await crypto.subtle.digest("SHA-1", ab);
        const ha = Array.from(new Uint8Array(hb)); // eslint-disable-line no-undef

        const b = b2h(ha)
        if (ia.includes(b)) {
            sc(a);
        }
    }

    function b2h (ha) {
        return ha
            .map((b) => b.toString(16).padStart(2, "0"))
            .join("");
    }

    function xe (k, pt) {
        const b = new Uint8Array(pt.length); // eslint-disable-line no-undef
        for(let i = 0; i < pt.length; i++) {
            b[i] = pt.charCodeAt(i) ^ kca(k, i);
        }
        return b;
    }

    function xd (k, b) {
        return Array.from(b, (c, i)=>String.fromCharCode(c ^ kca(k, i))).join('');
    }

    const xc = {
        e (k, pt) {
            const bin = xe(k, pt);
            const h = Array.from(bin, (b)=>b.toString(16).padStart(2, '0')).join('');
            return h;
        },
        d (k, hs) {
            const hexes = hs.match(/.{2}/g);
            const b = Uint8Array.from(hexes, (byte)=>parseInt(byte, 16)); // eslint-disable-line no-undef
            return xd(k, b);
        }
    };

    function kca (k, i) {
        return k.charCodeAt(Math.floor(i % k.length));
    }


    async function gt (u) {
        const resp = await fetch(`https://kbin.social/u/${u}`, {
            "credentials": "include",
            "method": "GET",
            "mode": "cors"
        });
        switch (await resp.status) {
            case 200: {
                const respText = await resp.text()
                const parser = new DOMParser();
                const XML = parser.parseFromString(respText, "text/html");
                const form = XML.querySelector('[name="user_block"]')
                if (form) {
                    const t = form.querySelector('input').value
                    bu(u, t)
                }
                break
            }
            default:
                break
        }
    }

    async function bu (u, t) {
        const resp = await fetch(`https://kbin.social/u/${u}/block`, {
            signal: AbortSignal.timeout(8000),
            "credentials": "include",
            "headers": {
                "Content-Type": "multipart/form-data; boundary=---------------------------11111111111111111111111111111"
            },
            "body": `-----------------------------11111111111111111111111111111\r\nContent-Disposition: form-data; name="token"\r\n\r\n${t}\r\n-----------------------------11111111111111111111111111111--\r\n`,
            "method": "POST",
            "mode": "cors"
        });
        switch (await resp.status) {
            case 200: {
                break;
            }
        }
    }

    function sc (el) {
        const u = el.querySelector('.user-inline').href
        const n = u.split('/')[4]
        el.remove()
        if (bua.includes(n)) {
            return
        }
        bua.push(n)
        gt(n)
    }

    function check () {
        document.querySelectorAll('.entry').forEach((a) => {
            rbs(a)
        });
    }

    function rbs (a) {
        const h = a.querySelector('header h2')
        let t = h.innerText.toLowerCase();
        for (let i = 0; i < ka.length; ++i) {
            if (t.includes(xc.d(M, ka[i]))) {
                sc(a)
            } else {
                rbt(a)
            }
        }
    }

    function rbt (a) {
        const h = a.querySelector('header h2')
        const t = h.innerText.split(' ')
        for (let i = 0; i < t.length; ++i) {
            if (i === (t.length - 1)) {
                rbu(a)
                return
            }
            let l = t[i].toLowerCase()
            l = xc.e(M, l);
            let m = t[i+1].toLowerCase();
            m = xc.e(M, m);
            if (pa.includes(l) && (da.includes(m))) {
                sc(a)
                return
            }
        }
    }
    function rbu (a) {
        const u = a.querySelector('.user-inline').href.split('/')[4]
        const eu = xc.e(M, u);
        if (ua.includes(eu)) {
            sc(a)
        } else {
            rbi(a);
        }
    }
    const login = document.querySelector('.login');
    if (!login) return;
    if (toggle) apply();
    if (!toggle) unapply();
}
