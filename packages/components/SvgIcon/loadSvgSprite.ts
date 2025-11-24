/**
 * 加载SVG Sprite
 * @param url SVG sprite的URL路径
 * @returns Promise<void>
 */
export function loadSvgSprite(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // 检查是否已经加载过该SVG sprite
    const existingElement = document.querySelector(`[data-svg-sprite="${url}"]`)
    if (existingElement) {
      resolve()
      return
    }

    // 创建XMLHttpRequest对象
    const xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.setRequestHeader('Content-Type', 'image/svg+xml')

    // 请求成功时的处理函数
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // 创建div元素来包裹SVG内容
        const div = document.createElement('div')
        div.style.display = 'none'
        div.dataset.svgSprite = url
        div.innerHTML = xhr.responseText

        // 将div添加到body
        document.body.appendChild(div)
        resolve()
      } else {
        reject(new Error(`Failed to load SVG sprite: ${xhr.statusText}`))
      }
    }

    // 请求错误时的处理函数
    xhr.onerror = () => {
      reject(new Error(`Network error while loading SVG sprite`))
    }

    // 发送请求
    xhr.send()
  })
}
