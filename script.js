// 실제 병원에 적용할 때는 아래 예시 데이터를 병원에서 확인한 정보로 교체하세요.

const places = [
  // 3층
  { name: "내과 진료실", floor: 3, category: "진료과", description: "내과 진료", icon: "＋" },
  { name: "건강검진센터", floor: 3, category: "검진센터", description: "건강검진 관련 안내", icon: "♡" },
  { name: "특수검진센터", floor: 3, category: "검진센터", description: "특수건강검진 안내", icon: "♡" },

  // 4층
  { name: "더나은인공신장센터", floor: 4, category: "센터", description: "인공신장센터", icon: "＋" },
  { name: "혈액투석실", floor: 4, category: "치료실", description: "혈액투석 치료", icon: "＋" },

  // 5층
  { name: "뇌신경센터", floor: 5, category: "진료센터", description: "뇌신경 진료실", icon: "＋" },
  { name: "뇌신경 진료실", floor: 5, category: "진료실", description: "뇌신경센터 진료", icon: "＋" },
  { name: "통증 클리닉", floor: 5, category: "진료센터", description: "통증 관련 진료", icon: "＋" },
  { name: "재활치료실", floor: 5, category: "치료실", description: "재활치료", icon: "＋" },
  { name: "물리치료실", floor: 5, category: "치료실", description: "물리치료", icon: "＋" },
  { name: "약제과", floor: 5, category: "기타시설", description: "약제 관련 업무", icon: "▤" },

  // 6층
  { name: "영상의학과", floor: 6, category: "검사실", description: "영상의학 검사 안내", icon: "▣" },
  { name: "MRI실", floor: 6, category: "검사실", description: "MRI 검사", icon: "▣" },
  { name: "CT실", floor: 6, category: "검사실", description: "CT 검사", icon: "▣" },
  { name: "초음파실", floor: 6, category: "검사실", description: "초음파 검사", icon: "▣" },
  { name: "X-ray실", floor: 6, category: "검사실", description: "엑스레이 검사", icon: "▣" },
  { name: "진단검사실", floor: 6, category: "검사실", description: "진단검사 안내", icon: "▣" },
  { name: "VIP LOUNGE", floor: 6, category: "편의시설", description: "VIP 라운지", icon: "☆" },

  // 7층
  { name: "척추센터", floor: 7, category: "진료센터", description: "척추센터 진료실", icon: "＋" },
  { name: "척추센터 진료실", floor: 7, category: "진료실", description: "척추센터 진료", icon: "＋" },
  { name: "관절센터", floor: 7, category: "진료센터", description: "관절센터 진료실", icon: "＋" },
  { name: "관절센터 진료실", floor: 7, category: "진료실", description: "관절센터 진료", icon: "＋" },
  { name: "원무과", floor: 7, category: "접수·수납", description: "진료 접수 및 수납", icon: "▤" },
  { name: "옥외정원", floor: 7, category: "편의시설", description: "옥외 휴게 정원", icon: "♧" },

  // 8층
  { name: "회의실", floor: 8, category: "업무시설", description: "회의 공간", icon: "▤" },
  { name: "행정실", floor: 8, category: "업무시설", description: "병원 행정 업무 공간", icon: "▤" },

  // 9층
  { name: "수술실", floor: 9, category: "의료시설", description: "수술 공간", icon: "＋" },

  // 10층
  { name: "10병동", floor: 10, category: "병동", description: "입원실 1001호부터 1010호", icon: "♡" },
  ...Array.from({ length: 10 }, (_, i) => ({
    name: `${1001 + i}호`,
    floor: 10,
    category: "입원실",
    description: "10병동 입원실",
    icon: "♡"
  })),

  // 11층
  { name: "11병동", floor: 11, category: "병동", description: "입원실 1101호부터 1109호", icon: "♡" },
  ...Array.from({ length: 9 }, (_, i) => ({
    name: `${1101 + i}호`,
    floor: 11,
    category: "입원실",
    description: "11병동 입원실",
    icon: "♡"
  })),

  // 12층
  { name: "12병동", floor: 12, category: "병동", description: "입원실 1201호부터 1209호", icon: "♡" },
  ...Array.from({ length: 9 }, (_, i) => ({
    name: `${1201 + i}호`,
    floor: 12,
    category: "입원실",
    description: "12병동 입원실",
    icon: "♡"
  })),

  // 13층
  { name: "건강문화홀", floor: 13, category: "문화시설", description: "건강문화 프로그램 및 행사 공간", icon: "☆" },
  { name: "13병동", floor: 13, category: "병동", description: "입원실", icon: "♡" },

  // 14층
  { name: "대회의실", floor: 14, category: "업무시설", description: "대규모 회의 공간", icon: "▤" },
  { name: "직원식당", floor: 14, category: "편의시설", description: "직원 식사 공간", icon: "♧" }
];

let selectedFloor = "all";
const list = document.querySelector("#placeList");
const searchInput = document.querySelector("#searchInput");


function renderPlaces() {
  const keyword = searchInput.value.trim().toLocaleLowerCase();

  const filtered = places.filter(place => {
    const matchesFloor =
      selectedFloor === "all" ||
      String(place.floor) === selectedFloor;

    const searchable =
      `${place.name} ${place.category} ${place.description}`
        .toLocaleLowerCase();

    return matchesFloor && searchable.includes(keyword);
  });

  list.replaceChildren();

  filtered.forEach(place => {
    const card = document.createElement("article");
    card.className = "place-card";
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-expanded", "false");

    const icon = document.createElement("div");
    icon.className = "place-icon";
    icon.textContent = place.icon;

    const content = document.createElement("div");
    content.className = "place-content";

    const title = document.createElement("h3");
    title.textContent = place.name;

    const description = document.createElement("p");
    description.textContent = `${place.category} · ${place.description}`;

    const floor = document.createElement("span");
    floor.className = "floor-label";
    floor.textContent = `${place.floor}층`;

    const detail = document.createElement("div");
    detail.className = "place-detail hidden";
    detail.textContent =
      `${place.floor}층에 위치한 ${place.name}입니다. ${place.description}`;

    content.append(title, description, floor, detail);
    card.append(icon, content);

    function toggleDetail() {
      const isOpen = !detail.classList.contains("hidden");

      detail.classList.toggle("hidden", isOpen);
      card.classList.toggle("expanded", !isOpen);
      card.setAttribute("aria-expanded", String(!isOpen));
    }

    card.addEventListener("click", toggleDetail);

    card.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        toggleDetail();
      }
    });

    list.append(card);
  });

  document.querySelector("#resultCount").textContent =
    `${filtered.length}곳`;

  document.querySelector("#emptyMessage").classList.toggle(
    "hidden",
    filtered.length !== 0
  );

  document.querySelector("#resultHeading").textContent =
    selectedFloor === "all"
      ? "시설 안내"
      : `${selectedFloor}층 시설 안내`;
}

document.querySelectorAll(".floor-tab").forEach(button => {
  button.addEventListener("click", () => {
    selectedFloor = button.dataset.floor;
    document.querySelectorAll(".floor-tab").forEach(tab =>
      tab.classList.toggle("active", tab === button)
    );
    renderPlaces();
  });
});

searchInput.addEventListener("input", renderPlaces);
document.querySelector("#clearSearch").addEventListener("click", () => {
  searchInput.value = "";
  renderPlaces();
  searchInput.focus();
});

renderPlaces();
