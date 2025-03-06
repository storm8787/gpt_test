function generateTitle() {
    // 제목 생성 결과 표시
    document.getElementById("titleResultBox").style.display = "block";
    document.getElementById("titleSelectionBox").style.display = "block";
}

function generatePressRelease() {
    // 보도자료 생성 결과 표시
    document.getElementById("pressReleaseBox").style.display = "block";
    document.getElementById("pressReleaseContent").style.display = "block";

    // 선택된 제목 가져오기
    let selectedTitle = document.getElementById("titleOptions").value;
    
    // 보도자료 내용 생성 (예제)
    document.getElementById("pressReleaseText").innerHTML = `
        <strong>${selectedTitle}</strong><br>
        보도자료 핵심 내용: ${document.getElementById("coreContent").value || "보도자료 내용 없음"}<br>
        키워드 포함하여 작성되었습니다.
    `;
}
