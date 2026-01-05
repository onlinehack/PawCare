import { Dog, User } from '../types';

export const MOCK_USER: User = {
  id: 'u_001',
  name: 'Pet Lover',
  mobile: '13800000000'
};

export const BREED_OPTIONS = [
  "金毛寻回犬", "拉布拉多", "柴犬", "威尔士柯基", 
  "泰迪/贵宾", "哈士奇", "萨摩耶", "边境牧羊犬", 
  "法国斗牛犬", "比熊", "博美", "吉娃娃", 
  "雪纳瑞", "约克夏", "中华田园犬", "其他品种"
];

export const ALLERGEN_OPTIONS = [
  "鸡肉", "牛肉", "羊肉", "鱼类",
  "乳制品", "鸡蛋", "玉米", "大豆",
  "小麦/麸质", "无过敏"
];

export const MOCK_DOGS: Dog[] = [
  {
    id: 'd_001',
    name: '旺财',
    breed: '金毛寻回犬',
    allergens: [],
    avatarUrl: 'https://picsum.photos/id/1025/200/200',
    currentWeight: 12.5,
    age: 3,
    isNeutered: true,
    inventoryDays: 3, // LOW ALERT
    totalFoodWeight: 5.0,
    remainingFoodWeight: 0.6,
    status: 'active',
    recipe: {
      id: 'r_001',
      dogId: 'd_001',
      name: '成年期全价处方粮',
      tags: ['美毛', '强健骨骼'],
      meatPercentage: 78,
      ingredients: ['鸡肉', '深海鱼油', '南瓜'],
      lastUpdated: '2023-10-01'
    }
  },
  {
    id: 'd_002',
    name: '来福',
    breed: '拉布拉多',
    allergens: ['鸡肉', '谷物'],
    avatarUrl: 'https://picsum.photos/id/1062/200/200',
    currentWeight: 24.0,
    age: 5,
    isNeutered: true,
    inventoryDays: 14,
    totalFoodWeight: 10.0,
    remainingFoodWeight: 4.5,
    status: 'active',
    recipe: {
      id: 'r_002',
      dogId: 'd_002',
      name: '低敏无谷配方',
      tags: ['低敏', '易消化'],
      meatPercentage: 65,
      ingredients: ['鸭肉', '红薯', '益生菌'],
      lastUpdated: '2023-09-15'
    }
  },
  {
    id: 'd_003',
    name: '豆豆',
    breed: '泰迪/贵宾',
    allergens: [],
    avatarUrl: 'https://picsum.photos/id/169/200/200',
    currentWeight: 4.2,
    age: 1,
    isNeutered: false,
    inventoryDays: 8,
    totalFoodWeight: 2.0,
    remainingFoodWeight: 0.8,
    status: 'active',
    recipe: {
      id: 'r_003',
      dogId: 'd_003',
      name: '幼犬成长配方',
      tags: ['高蛋白', '免疫力'],
      meatPercentage: 85,
      ingredients: ['牛肉', '羊奶粉', '胡萝卜'],
      lastUpdated: '2023-11-01'
    }
  }
];