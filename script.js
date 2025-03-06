const OPENAI_API_KEY = ""; // 🔹 OpenAI API 키 입력

// 🔹 제목 생성 함수 (ChatGPT API 호출)
async function generateTitle() {
    let style = document.querySelector("select").value;  // 🔹 보도자료 스타일
    let coreContent = document.getElementById("coreContent").value || "데이터 기반 행정 성과 발표"; // 🔹 핵심 내용
    let keywords = Array.from(document.querySelectorAll(".keyword-box input")) // 🔹 키워드 6개 중 입력된 값만 사용
                        .map(input => input.value.trim())
                        .filter(keyword => keyword !== "")
                        .join(", ");

    const prompt = `보도자료 스타일: ${style} \n 핵심 내용: ${coreContent} \n 키워드: ${keywords} \n 
    위 내용을 바탕으로 보도자료 제목 3개를 작성하세요.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4o",
            messages: [{ role: "system", content: prompt }],
            max_tokens: 50,
            n: 1,
        })
    });

    const data = await response.json();
    let generatedTitles = data.choices[0].message.content.split("\n").slice(0, 3); // 🔹 제목 3개 추출

    // 🔹 제목 옵션을 HTML에 표시
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

    // 🔹 UI 업데이트
    document.getElementById("titleResultBox").style.display = "block";
    document.getElementById("generatedTitles").style.display = "block";
    document.getElementById("titleSelectionBox").style.display = "block";
}

// 🔹 보도자료 본문 생성 함수 (ChatGPT API 호출)
async function generatePressRelease() {
    let selectedTitle = document.getElementById("titleOptions").value;
    let style = document.querySelector("select").value;
    let coreContent = document.getElementById("coreContent").value || "데이터 기반 행정 성과 발표";
    let keywords = Array.from(document.querySelectorAll(".keyword-box input"))
                        .map(input => input.value.trim())
                        .filter(keyword => keyword !== "")
                        .join(", ");

    const prompt = `보도자료 제목: ${selectedTitle} \n 스타일: ${style} \n 핵심 내용: ${coreContent} \n 키워드: ${keywords} \n 
    위 내용을 기반으로 3~5문단의 보도자료를 작성하세요.`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-4",
            messages: [{ role: "system", content: prompt }],
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
