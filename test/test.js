const prefix = (str) => {
    const n = str.length
    const p = Array(n).fill(0)

    let i = 1, j = 0

    while (i < str.length) {
        if (str[i] === str[j]) {
            p[i] = j + 1
            i ++
            j ++
        } else {
            if (j === 0) {
                p[i] = 0
                i ++
            } else {
                j = p[j - 1]
            }
        }
    }

    return p
}

const findStr = (str, searchString) => {
    const searchStringPrefix = prefix(searchString)
    let i = 0, j = 0

    while (i < str.length) {
        if (str[i] === searchString[j]) {
            j ++
            i ++

            if (j === searchString.length) {
                return i - searchString.length
            }
        } else {
            if (j > 0) {
                j = searchStringPrefix[j - 1]
            } else {
                i ++
            }
        }
    }

    if (i === str.length && j !== searchString.length) {
        return -1
    }
}

function getNextString() {
    let res = '';
    let counter = 0;
    let i = gen();
    let sumIndex = 0
    i.next();

    function* gen() {
        let input = '';

        while(true) {
            if(res.length > 100) {
                sumIndex += Math.floor(res.length / 2);
                res = res.slice(Math.floor(res.length / 2))
            }
            for(let i = counter; i < counter + 10; i++) {
                res += i;
            }
            counter += 10
            input = res
            yield {res, sumIndex}
        }

    }

    return i;
}

function findPosition(num){
    const s = getNextString();
    while(true) {
        const {value, done } = s.next();

        if(done) {
            throw new Error('Одна ошибка и ты ошибся');
        }

        const res = findStr(value.res, num);

        if(res !== -1) {
            return value.sumIndex + res -1;
        }
    }
}

// console.log(findPosition("555899959741198")) // 1686722738828503

console.log(findPosition("456")) // 3

console.log(findPosition("454")) // 79

console.log(findPosition("455")) // 98

console.log(findPosition("910")) // 8

console.log(findPosition("9100")) // 188

console.log(findPosition("99100")) // 187

console.log(findPosition("00101")) // 190

console.log(findPosition("001")) // 190

console.log(findPosition("123456789")) // 0
console.log(findPosition("1234567891")) // 0
console.log(findPosition("123456798")) // 1000000071
