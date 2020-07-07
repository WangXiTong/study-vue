// 对象响应式原理
// 1.Object.defineProperty()
function defineReactive(obj, key, val) {
  // val可能是对象 需要递归处理
  observe(val);
  Object.defineProperty(obj, key, {
    get() {
      console.log("get", val);
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        console.log("set", newVal);
        observe(newVal);
        val = newVal;
      }
    },
  });
}

// 数组响应式
// 1、替换数组原型中的7个方法
const originalProto = Array.prototype;
// 备份  修改备份
const arrayProto = Object.create(originalProto);
["push", "pop", "shift", "unshift"].forEach((method) => {
  arrayProto[method] = function () {
    // 原始操作
    originalProto[method].apply(this, arguments);
    // 覆盖操作：通知更新
    console.log("数组执行" + method + "操作");
  };
});

// 对象响应式处理
function observe(obj) {
  // 判断传入的obj是不是对象
  if (typeof obj !== "object" || obj == null) {
    return;
  }

  // 判断传入的obj类型
  if (Array.isArray(obj)) {
    // 覆盖原型 替换7个变更操作
    obj.__proto__ = arrayProto;
    // 对数组内部元素执行响应化
    const keys = Object.keys(obj);
    for (let i = 0; i < obj.length; i++) {
      observe(obj[i]);
    }
  } else {
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]));
  }
}

function set(obj, key, val) {
  defineReactive(obj, key, val);
}

const obj = { foo: "foo", bar: "bar", baz: { a: 1 }, arr: [1, 2, 3] };
observe(obj);

// obj.foo;
// obj.foo = "aaaaa";
// obj.bar;

// obj.baz.a = "111";
// obj.baz = { a: 2222 };
// obj.baz.a = 100;

// obj.dong = "dong";
// obj.dong;

// set(obj, "dong", "dong");
// obj.dong;

// obj.arr[1];

obj.arr.push(4);
