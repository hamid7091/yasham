export default function tabChanger(
  event,
  tabOneRef,
  tabTwoRef,
  formOne,
  formTwo
) {
  if (event.target.id === "disposable-tab") {
    tabOneRef.current.classList.add("active-tab");
    tabTwoRef.current.classList.remove("active-tab");
    formOne.current.classList.remove("d-none");
    formTwo.current.classList.add("d-none");
  } else {
    tabOneRef.current.classList.remove("active-tab");
    tabTwoRef.current.classList.add("active-tab");
    formOne.current.classList.add("d-none");
    formTwo.current.classList.remove("d-none");
  }
}

export function footerChanger(e, setLocation) {
  const currentFooter = e.currentTarget;
  const footerN = currentFooter.nextElementSibling;
  const footerP = currentFooter.previousElementSibling;
  const footerParent = Array.from(currentFooter.parentElement.children);

  Array.from(currentFooter.children)[0].classList.add("d-none");
  Array.from(currentFooter.children)[1].classList.remove("d-none");
  Array.from(currentFooter.children)[2].classList.remove("d-none");

  if (footerN && footerP) {
    currentFooter.classList.add("active-footer-tab");
    footerN.classList.remove("active-footer-tab");
    footerP.classList.remove("active-footer-tab-menu");
    setLocation("totalTasks");
    window.scrollTo(0, 0);

    Array.from(footerN.children)[0].classList.remove("d-none");
    Array.from(footerN.children)[1].classList.add("d-none");
    Array.from(footerP.children)[0].classList.remove("d-none");
    Array.from(footerP.children)[1].classList.add("d-none");

    Array.from(footerN.children)[2].classList.add("d-none");
    Array.from(footerP.children)[2].classList.add("d-none");
  } else if (footerN === null) {
    currentFooter.classList.add("active-footer-tab");

    footerP.classList.remove("active-footer-tab");
    footerParent[0].classList.remove("active-footer-tab-menu");
    setLocation("dashboard");
    window.scrollTo(0, 0);

    Array.from(footerP.children)[0].classList.remove("d-none");
    Array.from(footerP.children)[1].classList.add("d-none");
    Array.from(footerParent[0].children)[0].classList.remove("d-none");
    Array.from(footerParent[0].children)[1].classList.add("d-none");

    Array.from(footerP.children)[2].classList.add("d-none");
    Array.from(footerParent[0].children)[2].classList.add("d-none");
  } else {
    currentFooter.classList.add("active-footer-tab-menu");

    footerN.classList.remove("active-footer-tab");
    footerParent[2].classList.remove("active-footer-tab");
    setLocation("actionMenu");
    window.scrollTo(0, 0);

    Array.from(footerN.children)[0].classList.remove("d-none");
    Array.from(footerN.children)[1].classList.add("d-none");
    Array.from(footerParent[2].children)[0].classList.remove("d-none");
    Array.from(footerParent[2].children)[1].classList.add("d-none");

    Array.from(footerN.children)[2].classList.add("d-none");
    Array.from(footerParent[2].children)[2].classList.add("d-none");
  }
}
