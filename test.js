const testsDestinations = [
    [
        "Test displayDestinations with valid map", // Test Name
        displayDestinations, // Function to test
        [ // Test parameters
            new Map([
                ["Mars", 1000],
                ["Jupiter", 1500],
                ["Saturn", 2000],
            ]),
        ],
        undefined, // Expected return value
        "Mars: 1000\nJupiter: 1500\nSaturn: 2000", // Expected logs
        undefined, // Expected parameters value after the test
    ],
    [
        "Test displayDestinations with empty map",
        displayDestinations,
        [new Map()],
        undefined,
        "No destination is available.",
    ]
];


var reclogs = {};
const oldLog = console.log;
console.log = (msg) => {
    if (Object.keys(reclogs).length == 0) {
        oldLog(msg);
    } else {
        for (var k of Object.keys(reclogs)) {
            if (reclogs[k] != "") {
                reclogs[k] += "\n";
            }

            reclogs[k] += msg;
        }
    }
};

function recordLog(key) {
    if (Object.keys(reclogs).includes(key)) {
        const out = reclogs[key];

        delete reclogs[key];

        return out;
    } else {
        reclogs[key] = "";
    }
}


function equals(a, b) {
    if (typeof a != typeof b) {
        return false;
    }

    if (["object"].includes(typeof a)) {
        if (Object.entries(a).length !== Object.entries(b).length) {
            return false;
        }

        for (let i = 0; i < a.length; i++) {
            if (!equals(a[i], b[i])) {
                return false;
            }
        }
    } else {
        return a == b;
    }

    return true;
}


const totest = [addTraveler]; // Functions to test, empty=ALL

function doTests(tests) {
    for (var test of tests) {
        var [name, fct, params, exres, exlogs, exparams] = test;
        var oparams = structuredClone(params);

        if (totest.length > 0 && !totest.includes(fct)) {
            continue;
        }

        if (exlogs) {
            recordLog(name);
        }

        var res = fct(...params);

        var logs = "";

        if (exlogs) {
            logs = recordLog(name);
        }

        var validLogs = true;

        if (exlogs) {
            validLogs = logs == exlogs;
        }

        var validParams = true;

        if (exparams) {
            validParams = equals(exparams, params);
        }

        var retvalid = equals(res, exres);

        if (retvalid && validLogs && validParams) {
            console.log(`${name}: ✅`);
        } else {
            console.log(`${name}: ❌`);
            console.log(`   Parameters: ${oparams.join(" | ")}\n`);

            if (!retvalid) {
                console.log(`   ➡️Ret Expected: ${exres}`);
                console.log(`   ➡️Ret Got: ${res}`);
            } else {
                console.log(`   ➡️Return: ${res}`);
            }

            if (exlogs) {
                if (!validLogs) {
                    console.log(`   🗨️Logs Expected: ${exlogs}`);
                    console.log(`   🗨️Logs Got: ${logs}`);
                } else {
                    console.log(`   🗨️Logs: ${res}`);
                }
            }

            if (exparams && !validParams) {
                if (!validParams) {
                    console.log(
                        `   ⚙️Params Expected: ${exparams.join(" | ")}`,
                    );
                    console.log(`   ⚙️Params Got: ${params.join(" | ")}`);
                } else {
                    console.log(`   ⚙️Params: ${res}`);
                }
            }

            console.log("");
        }
    }
}

doTests(testsDestinations);
