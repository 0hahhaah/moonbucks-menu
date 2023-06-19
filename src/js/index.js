const $ = (selector) => document.querySelector(selector);

function App() {
  const updateMenuCount = () => {
    const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    $(".menu-count").innerText = `총 ${menuCount}개`;
  };

  $("#espresso-menu-list").addEventListener("click", (e) => {
    const $menuName = e.target.closest("li").querySelector(".menu-name");

    if (e.target.classList.contains("menu-edit-button")) {
      const updatedMenuName = prompt(
        "메뉴명을 수정하세요",
        $menuName.innerText
      );
      $menuName.innerText = updatedMenuName;
    }

    if (e.target.classList.contains("menu-remove-button")) {
      const remove = confirm(`${$menuName.innerText}를 삭제하시겠습니까?`);
      if (remove) {
        e.target.closest("li").remove();
        alert(`${$menuName.innerText}를 삭제했습니다.`);
        updateMenuCount();
      }
    }
  });

  $("#espresso-menu-form").addEventListener("submit", (e) => {
    e.preventDefault();
  });

  const addMenuName = () => {
    const espressoMenuName = $("#espresso-menu-name").value;

    if (espressoMenuName === "") {
      alert("메뉴 이름을 입력해주세요");
      return;
    }

    const menuItemTemplate = (espressoMenuName) => {
      return `
        <li class="menu-list-item d-flex items-center py-2">
          <span class="w-100 pl-2 menu-name">${espressoMenuName}</span>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
          >
          수정
          </button>
          <button
            type="button"
            class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
          >
          삭제
          </button>
        </li>
      `;
    };

    $("#espresso-menu-list").insertAdjacentHTML(
      "beforeend",
      menuItemTemplate(espressoMenuName)
    );

    $("#espresso-menu-name").value = "";

    // const menuCount = $("#espresso-menu-list").querySelectorAll("li").length;
    // $(".menu-count").innerText = `총 ${menuCount}개`;
    updateMenuCount();
  };

  //메뉴 입력 후 확인 버튼
  $("#espresso-menu-submit-button").addEventListener("click", () => {
    addMenuName();
  });

  //메뉴 입력 후 엔터
  $("#espresso-menu-name").addEventListener("keypress", (e) => {
    if (e.key !== "Enter") {
      return;
    }
    addMenuName();
  });
}

App();
