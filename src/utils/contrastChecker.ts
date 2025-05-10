
/**
 * 色彩对比度检测工具
 * 基于WCAG 2.0标准，文本应达到4.5:1的对比度
 */

/**
 * 将RGB颜色转换为亮度值
 * @param r Red (0-255)
 * @param g Green (0-255)
 * @param b Blue (0-255)
 */
export const getLuminance = (r: number, g: number, b: number): number => {
  // 转换为sRGB
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;

  // 将sRGB值转换为亮度
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);

  // 计算亮度
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

/**
 * 计算两个颜色之间的对比度
 * @param color1 RGB颜色如 [255, 255, 255]
 * @param color2 RGB颜色如 [0, 0, 0]
 * @returns 对比度比率
 */
export const calculateContrast = (
  color1: [number, number, number],
  color2: [number, number, number]
): number => {
  const luminance1 = getLuminance(color1[0], color1[1], color1[2]);
  const luminance2 = getLuminance(color2[0], color2[1], color2[2]);

  // 计算对比度比率
  const lighter = Math.max(luminance1, luminance2);
  const darker = Math.min(luminance1, luminance2);

  return (lighter + 0.05) / (darker + 0.05);
};

/**
 * 检查颜色对比度是否符合WCAG标准
 * @param color1 RGB颜色如 [255, 255, 255]
 * @param color2 RGB颜色如 [0, 0, 0]
 * @param standard 'AA' 需要4.5:1, 'AAA' 需要7:1
 */
export const checkContrast = (
  color1: [number, number, number],
  color2: [number, number, number],
  standard: 'AA' | 'AAA' = 'AA'
): { ratio: number; passes: boolean } => {
  const ratio = calculateContrast(color1, color2);
  const threshold = standard === 'AA' ? 4.5 : 7;
  
  return {
    ratio,
    passes: ratio >= threshold
  };
};

/**
 * 将十六进制颜色转换为RGB数组
 * @param hex 十六进制颜色如 "#FFFFFF"
 */
export const hexToRgb = (hex: string): [number, number, number] | null => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [
        parseInt(result[1], 16),
        parseInt(result[2], 16),
        parseInt(result[3], 16)
      ]
    : null;
};

/**
 * 检查Tailwind类的色彩对比度
 * 这是一个简化版，实际使用需要映射Tailwind颜色值
 * @param textClass Tailwind文本颜色类
 * @param bgClass Tailwind背景颜色类
 */
export const checkTailwindContrast = (textClass: string, bgClass: string): boolean => {
  // 这里需要映射Tailwind颜色到RGB值
  // 简化实现，实际项目中可扩展为完整映射
  const tailwindColors = {
    'text-white': [255, 255, 255] as [number, number, number],
    'bg-meituan-orange': [255, 107, 53] as [number, number, number],
    'text-meituan-blue': [26, 42, 64] as [number, number, number],
    'bg-white': [255, 255, 255] as [number, number, number],
    'text-gray-500': [107, 114, 128] as [number, number, number]
  };

  const textColor = tailwindColors[textClass as keyof typeof tailwindColors];
  const bgColor = tailwindColors[bgClass as keyof typeof tailwindColors];

  if (!textColor || !bgColor) return true; // 未知颜色，默认通过

  return checkContrast(textColor, bgColor).passes;
};

