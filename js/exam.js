tailwind.config = {
    theme: {
        extend: {
            colors: {
                primary: '#165DFF',
                secondary: '#36CFC9',
                warning: '#FF7D00',
                success: '#00B42A',
                danger: '#F53F3F',
                neutral: {
                    100: '#F2F3F5',
                    200: '#E5E6EB',
                    300: '#C9CDD4',
                    400: '#86909C',
                    500: '#4E5969',
                    600: '#272E3B',
                    700: '#1D2129',
                }
            },
            fontFamily: {
                inter: ['Inter', 'system-ui', 'sans-serif'],
            },
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // 模拟进度条动画效果
    const progressBars = document.querySelectorAll('.progress-value');
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        setTimeout(() => {
            bar.style.width = width;
        }, 300);
    });

    // 获取所有"进入判卷"按钮
    const gradingButtons = document.querySelectorAll('button[data-exam-id]');

    // 为每个按钮添加点击事件
    gradingButtons.forEach(button => {
        button.addEventListener('click', function() {
            const examId = this.getAttribute('data-exam-id');
            const examName = this.getAttribute('data-exam-name');

            // 显示确认对话框
            if (confirm(`确定要进入"${examName}"的判卷页面吗？`)) {
                // 记录操作日志
                // console.log(`用户开始判卷: ID=${examId}, 名称=${examName}`);

                // 模拟页面跳转（实际项目中替换为真实URL）
                simulatePageLoading(examId, examName);
            }
        });
    });

    // 模拟页面加载效果
    function simulatePageLoading(examId, examName) {
        // 创建加载遮罩
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/50 flex items-center justify-center z-50';
        overlay.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
                <div class="flex flex-col items-center">
                    <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
                    <p class="text-lg font-medium text-neutral-700 mb-2">正在加载判卷页面</p>
                    <p class="text-sm text-neutral-500">考试: ${examName}</p>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        setTimeout(() => {
            document.body.removeChild(overlay);
            window.parent.postMessage({ type: 'urlChange', url: "markingPaper/questionsList.html" }, '*');
        }, 500);
    }
});