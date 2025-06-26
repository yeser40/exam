const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

let ifFirst = true;

allSideMenu.forEach(item => {
    const li = item.parentElement;

    item.addEventListener('click', function () {
        allSideMenu.forEach(i => {
            i.parentElement.classList.remove('active');
        })
        li.classList.add('active');
        breadcrumb.innerHTML = '';
        ifFirst = true;
        if (li.id === 'exam') {
            window.postMessage({ type: 'urlChange', url: "markingPaper/examList.html" }, '*');
        }else if (li.id === 'examSummary') {
            window.postMessage({ type: 'urlChange', url: "examAnalysis/examList.html" }, '*');
        } else if (li.id === 'studentSummary') {
            window.postMessage({ type: 'urlChange', url: "learningAnalysis/studentList.html" }, '*');
        }
    })
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

// Sidebar toggle işlemi
menuBar.addEventListener('click', function () {
    sidebar.classList.toggle('hide');
});

// Sayfa yüklendiğinde ve boyut değişimlerinde sidebar durumunu ayarlama
function adjustSidebar() {
    if (window.innerWidth <= 576) {
        sidebar.classList.add('hide');  // 576px ve altı için sidebar gizli
        sidebar.classList.remove('show');
    } else {
        sidebar.classList.remove('hide');  // 576px'den büyükse sidebar görünür
        sidebar.classList.add('show');
    }
}

// Sayfa yüklendiğinde ve pencere boyutu değiştiğinde sidebar durumunu ayarlama
window.addEventListener('load', adjustSidebar);
window.addEventListener('resize', adjustSidebar);

// Notification Menu Toggle
document.querySelector('.notification').addEventListener('click', function () {
    document.querySelector('.notification-menu').classList.toggle('show');
    document.querySelector('.profile-menu').classList.remove('show'); // Close profile menu if open
});

// Profile Menu Toggle
document.querySelector('.profile').addEventListener('click', function () {
    document.querySelector('.profile-menu').classList.toggle('show');
    document.querySelector('.notification-menu').classList.remove('show'); // Close notification menu if open
});

// Close menus if clicked outside
window.addEventListener('click', function (e) {
    if (!e.target.closest('.notification') && !e.target.closest('.profile')) {
        document.querySelector('.notification-menu').classList.remove('show');
        document.querySelector('.profile-menu').classList.remove('show');
    }
});

// Menülerin açılıp kapanması için fonksiyon
function toggleMenu(menuId) {
    var menu = document.getElementById(menuId);
    var allMenus = document.querySelectorAll('.menu');

    // Diğer tüm menüleri kapat
    allMenus.forEach(function(m) {
        if (m !== menu) {
            m.style.display = 'none';
        }
    });

    // Tıklanan menü varsa aç, yoksa kapat
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}

// Başlangıçta tüm menüleri kapalı tut
document.addEventListener("DOMContentLoaded", function() {
    const allMenus = document.querySelectorAll('.menu');
    allMenus.forEach(function(menu) {
        menu.style.display = 'none';
    });
});

const iframe = document.getElementById('myIframe');
const breadcrumb = document.getElementById('breadcrumb');

window.addEventListener('message', function(e) {
    if (e.data.type === 'urlChange') {
        const newSrc = e.data.url;
        iframe.src = newSrc;
        let text = '';
        if (newSrc.includes('questionsList.html')) {
            text = '题目列表';
        }else if (newSrc.includes('markingPaper.html')) {
            text = '试卷批阅';
        }else if (newSrc.includes('examAnalysis.html')) {
            text = '考试分析';
        }else if (newSrc.includes('learningAnalysis.html')) {
            text = '学情分析';
        }else if (newSrc.includes('examList.html')) {
            text = '考试一览';
        }else if (newSrc.includes('studentList.html')) {
            text = '学生列表';
        }else if (newSrc.includes('questionAnalysis.html')) {
            text = '单题详情';
        }else if (newSrc.includes('studentAnalysis.html')) {
            text = '学生详情';
        }else if (newSrc.includes('studentList.html')) {
            text = '学生列表';
        }else if (newSrc.includes('learningAnalysis.html')) {
            text = '学情分析';
        }else if (newSrc.includes('errorRemarking.html')) {
            text = '错判处理';
        }
        if(!ifFirst) {
            const navigationItems1 = document.createElement('li');
            navigationItems1.innerHTML = `
                    <i class="fa fa-angle-right"></i>
                `;
            breadcrumb.appendChild(navigationItems1)
        }else {
            ifFirst = false;
        }
        const navigationItems2 = document.createElement('li');
        const currentUrl = document.createElement('a');
        currentUrl.href = newSrc;
        currentUrl.textContent = text;
        currentUrl.classList.add('hover:text-primary', 'transition-colors');
        currentUrl.addEventListener('click', function(event) {
            event.preventDefault();
            iframe.src = newSrc;
            const breadcrumbItems = breadcrumb.children;
            for (let i = breadcrumbItems.length - 1; i >= 0; i--) {
                if (breadcrumbItems[i].children[0].tagName === 'I') {
                    breadcrumb.removeChild(breadcrumbItems[i]);
                }else if (breadcrumbItems[i].children[0].href.includes(newSrc)) {
                    break;
                }
                else {
                    breadcrumb.removeChild(breadcrumbItems[i]);
                }
            }
        });
        navigationItems2.appendChild(currentUrl);
        // navigationItems2.innerHTML = `
        //         <a href="${newSrc}" class="hover:text-primary transition-colors breadcrumb">${text}</a>
        //     `;
        breadcrumb.appendChild(navigationItems2)
    }
});
window.postMessage({ type: 'urlChange', url: "markingPaper/examList.html" }, '*');


