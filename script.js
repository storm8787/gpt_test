const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // 🔹 OpenAI API 키 입력

// 🔹 제목 생성 함수 (ChatGPT 호출)
async function generateTitle() {
    let coreContent = document.getElementById("coreContent").value || "데이터 기반 행정 성과 발표";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "system", content: `다음 내용을 기반으로 보도자료 제목 3개를 생성하세요: ${coreContent}` }],
            max_tokens: 50,
            n: 1,
        })
    });

    const data = await response.json();
    let generatedTitles = data.choices[0].message.content.split("\n").slice(0, 3); // 🔹 제목 3개 추출

    // 🔹 제목 옵션을 HTML에 직접 표시
    document.getElementById("title1").textContent = generatedTitles[0] || "제목 옵션 1";
    document.getElementById("title2").textContent = generatedTitles[1] || "제목 옵션 2";
    document.getElementById("title3").textContent = generatedTitles[2] || "제목 옵션 3";

    // 🔹 제목 선택 콤보박스 업데이트
    let titleOptions = document.getElementById("titleOptions");
    titleOptions.innerHTML = "";
    generatedTitles.forEach(title => {
        let option = document.createElement("option");
        option.textContent = title.trim();
        titleOptions.appendChild(option);
    });

    // 🔹 제목 생성 결과 표시
    document.getElementById("titleResultBox").style.display = "block";
    document.getElementById("generatedTitles").style.display = "block";
    document.getElementById("titleSelectionBox").style.display = "block";
}

// 🔹 보도자료 생성 함수 (ChatGPT 호출)
async function generatePressRelease() {
    let selectedTitle = document.getElementById("titleOptions").value;
    let coreContent = document.getElementById("coreContent").value || "데이터 기반 행정 성과 발표";

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "system", content: `보도자료 제목: ${selectedTitle} \n 핵심 내용: ${coreContent} \n 이를 기반으로 3~5문단짜리 보도자료를 작성하세요.` }],
            max_tokens: 300,
            n: 1,
        })
    });

    const data = await response.json();
    let generatedContent = data.choices[0].message.content;

    // 🔹 보도자료 결과 표시
    document.getElementById("pressReleaseBox").style.display = "block";
    document.getElementById("pressReleaseContent").style.display = "block";
    document.getElementById("pressReleaseText").innerHTML = generatedContent;
}
