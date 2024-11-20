const core = require('@actions/core');

try {
  // `body`, `splitStr`, `splitIndex`, `replaceBefore`, `replaceAfter`, `envName` 입력값 가져오기
  const body = core.getInput('body', { required: true });
  const splitStr = core.getInput('split', { required: false });
  const splitIndex = splitStr ? parseInt(core.getInput('splitIndex', { required: true }), 10) : null;
  const replaceBefore = core.getInput('replaceBefore', { required: false });
  const replaceAfter = core.getInput('replaceAfter', { required: false });
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

  // 결과를 `GITHUB_ENV`에 저장
  core.exportVariable(envName, result);

  console.log(`Parsed Result: ${result}`);
} catch (error) {
  core.setFailed(`Error: ${error.message}`);
}
