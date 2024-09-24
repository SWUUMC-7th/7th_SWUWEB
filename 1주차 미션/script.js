window.onload=function(){
    var input=document.querySelector('input');

    //1. 클릭 시 인풋창 border 스타일 변경&해제
    //2. "스터디 계획을 작성해 보세요!" 문구 삭제
    input.onfocus=function(){
        input.style.border='2px solid #58A6E9';
        input.style.borderRadius='5px';
        input.value="";
    }
    input.onblur=function(){
        input.style.border='2px solid black';
        input.style.borderRadius='0px';
        input.value="스터디 계획을 작성해 보세요!";
    }
    // 3. Enter키 누를 시 요소를 해야할 일 목록에 추가
    input.onkeydown = function(event) {
        if (event.keyCode == 13) {
            // 할일 요소
            const inputValue = input.value;
            const listElement = document.createElement('h2');
            listElement.textContent = inputValue;
            const todoList = document.getElementById('todoList');
            // 완료 버튼
            const doneButton = document.createElement('button');
            doneButton.textContent = "완료";
            listElement.appendChild(doneButton);

            todoList.appendChild(listElement);
            // 삭제 버튼
            const deleteButton = document.createElement('button');
            deleteButton.textContent = "삭제";

            input.value = "";

            // 4. 완료 버튼 누를 시 '해낸 일' 리스트로 옮기기
            doneButton.onclick = function() {
                const doneList = document.getElementById('doneList');
                listElement.appendChild(deleteButton);
                listElement.removeChild(doneButton);
                doneList.appendChild(listElement);

                todoList.removeChild(listElement); 
            };

            // 5. 삭제 버튼 누를 시 삭제
            deleteButton.onclick = function() {
                doneList.removeChild(listElement);
                tododoneList.removeChild(deleteButton);  // 목록에서 삭제
            };
        }
    };
};