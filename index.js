const core = require('@actions/core');

try {
  // `body`, `splitStr`, `splitIndex`, `replaceBefore`, `replaceAfter`, `envName` 입력값 가져오기
  const body = core.getInput('body', { required: true });
  const splitStr = core.getInput('split', { required: false });
  const splitIndex = splitStr ? parseInt(core.getInput('splitIndex', { required: true }), 10) : null;
  const replaceBefore = core.getInput('replaceBefore', { required: false });
  const replaceAfter = core.getInput('replaceAfter', { required: false });
  const substringStart = core.getInput('substringStart', { required: false });
  const substringEnd = core.getInput('substringEnd', { required: false });
  const envName = core.getInput('envName', { required: true });

  // splitStr이 있는 경우, splitIndex가 존재해야 함
  if (splitStr && splitIndex === null) {
    throw new Error('splitStr이 주어졌을 경우, splitIndex도 필수입니다.');
  }

  // 문자열 처리
  let result = body;

  // split 처리
  if (splitStr) {
    const splitResult = result.split(splitStr);
    if (splitIndex >= splitResult.length || splitIndex < 0) {
      throw new Error(`Invalid splitIndex: ${splitIndex}. It should be between 0 and ${splitResult.length - 1}.`);
    }
    result = splitResult[splitIndex];
  }

  // replaceBefore 및 replaceAfter 처리
  if (replaceBefore && replaceAfter != null) {
    result = result.replace(replaceBefore, replaceAfter);
  }

  // substring 처리
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

  // 결과를 `GITHUB_ENV`에 저장
  core.exportVariable(envName, result);

  console.log(`Parsed Result: ${result}`);
} catch (error) {
  core.setFailed(`Error: ${error.message}`);
}
