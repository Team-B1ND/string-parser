let text = `<Student>
릴리즈 노트 작성
<Teacher>
릴리즈 노트 작성`

console.log(text.split('<Teacher>')[1].substring(1)) // <Student>

let result = `<Student>
릴리즈 노트 작성
<Teacher>
릴리즈 노트 작성`
const substringStart = "1"
const substringEnd = ""

if (substringStart !== undefined || substringEnd !== undefined) {
  const start = substringStart ? parseInt(substringStart, 10) : 0;
  const end = substringEnd ? parseInt(substringEnd, 10) : result.length;

  if (isNaN(start) || isNaN(end)) {
    throw new Error('substringStart와 substringEnd는 숫자여야 합니다.');
  }

  if (start < 0 || end > result.length || start > end) {
    throw new Error(`Invalid substring range: start=${start}, end=${end}.`);
  }

  result = result.substring(start, end);
}

console.log(result);
