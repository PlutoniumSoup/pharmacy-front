export interface ProductStockInfo {
  batch_number: string;
  expiry_date: string; // Используем string для простоты, в реальном приложении Date
  quantity: number;
  arrival_date: string; // Используем string для простоты
}

export interface Product {
  _id?: string; // MongoDB ID, опционально при создании
  name: string;
  international_name?: string;
  manufacturer: string;
  form: string; // e.g., "таблетки", "капсулы", "мазь"
  dosage: string; // e.g., "10мг", "500мг/5мл"
  packaging: string; // e.g., "№10", "100мл"
  barcode?: string; // Уникальный
  needs_prescription: boolean;
  category_id?: string; // Ссылка на категорию
  // Для упрощения примера, retail_price и stock_info будут управляться отдельно или захардкожены в моках
  retail_price: number;
  current_stock: number; // Общее текущее количество для простоты
  // stock_info?: ProductStockInfo[]; // Закомментировано для упрощения UI
}

// Можете добавить другие типы, например, для категорий, продаж и т.д.
// export interface Category {
//   _id: string;
//   name: string;
// }