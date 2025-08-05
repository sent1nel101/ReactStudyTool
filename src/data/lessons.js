// Comprehensive lesson data structure
export const lessons = [
  {
    id: 1,
    title: "Creating Components",
    description: "Learn to create functional and class components in React",
    difficulty: "beginner",
    estimatedTime: "30 minutes",
    status: "not-attempted",
    content: {
      theory: `
# Creating Components in React

React components are the building blocks of React applications. They are reusable pieces of UI that can accept inputs (props) and return JSX elements.

## Functional Components
Functional components are JavaScript functions that return JSX:

\`\`\`javascript
function Welcome(props) {
  return <h1>Hello, {props.name}!</h1>;
}
\`\`\`

## Arrow Function Components
You can also use arrow functions:

\`\`\`javascript
const Welcome = (props) => {
  return <h1>Hello, {props.name}!</h1>;
};
\`\`\`

## Key Points:
- Component names must start with a capital letter
- Components should return a single JSX element or React Fragment
- Components can be reused throughout your application
      `,
      example: `// Example: Creating a simple greeting component
function Greeting({ name, age }) {
  return (
    <div>
      <h2>Hello, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

// Usage
function App() {
  return (
    <div>
      <Greeting name="Alice" age={25} />
      <Greeting name="Bob" age={30} />
    </div>
  );
}`,
      exercises: [
        {
          id: 1,
          title: "Basic Component Creation",
          difficulty: "beginner",
          instruction: "Create a component called 'UserCard' that accepts name, email, and role as props and displays them in a card format.",
          initialCode: `// Create your UserCard component here
function UserCard() {
  // Your code here
}

// Test your component
function App() {
  return (
    <div>
      <UserCard 
        name="John Doe" 
        email="john@example.com" 
        role="Developer" 
      />
    </div>
  );
}`,
          solution: `function UserCard({ name, email, role }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3>{name}</h3>
      <p>Email: {email}</p>
      <p>Role: {role}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserCard 
        name="John Doe" 
        email="john@example.com" 
        role="Developer" 
      />
    </div>
  );
}`,
          tests: [
            {
              description: "Component should accept and display name prop",
              test: (code) => code.includes('name') && code.includes('{name}')
            },
            {
              description: "Component should accept and display email prop",
              test: (code) => code.includes('email') && code.includes('{email}')
            },
            {
              description: "Component should accept and display role prop",
              test: (code) => code.includes('role') && code.includes('{role}')
            },
            {
              description: "Component should be named UserCard",
              test: (code) => code.includes('function UserCard') || code.includes('const UserCard')
            }
          ]
        },
        {
          id: 2,
          title: "Component with Default Props",
          difficulty: "intermediate",
          instruction: "Create a 'ProductCard' component that accepts title, price, and imageUrl props. Provide default values for props and handle missing images gracefully.",
          initialCode: `// Create your ProductCard component with default props
function ProductCard() {
  // Your code here
}

// Test your component
function App() {
  return (
    <div>
      <ProductCard title="Laptop" price={999} />
      <ProductCard title="Phone" price={599} imageUrl="phone.jpg" />
      <ProductCard />
    </div>
  );
}`,
          solution: `function ProductCard({ 
  title = "Unknown Product", 
  price = 0, 
  imageUrl = "https://via.placeholder.com/150x150?text=No+Image" 
}) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      backgroundColor: '#fff',
      maxWidth: '200px',
      textAlign: 'center'
    }}>
      <img 
        src={imageUrl} 
        alt={title}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '4px'
        }}
      />
      <h3 style={{ margin: '10px 0' }}>{title}</h3>
      <p style={{ 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: '#007BFF' 
      }}>
        \${price}
      </p>
    </div>
  );
}

function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      <ProductCard title="Laptop" price={999} />
      <ProductCard title="Phone" price={599} imageUrl="phone.jpg" />
      <ProductCard />
    </div>
  );
}`,
          tests: [
            {
              description: "Component should have default values for props",
              test: (code) => code.includes('=') && (code.includes('"') || code.includes("'"))
            },
            {
              description: "Component should display title, price, and image",
              test: (code) => code.includes('title') && code.includes('price') && code.includes('img')
            },
            {
              description: "Component should handle missing props gracefully",
              test: (code) => code.includes('Unknown') || code.includes('placeholder') || code.includes('default')
            }
          ]
        },
        {
          id: 3,
          title: "Advanced Component Composition",
          difficulty: "expert",
          instruction: "Create a flexible 'Card' component that can wrap any content, and use it to build 'ProfileCard' and 'StatsCard' components. Implement proper TypeScript-like prop validation using PropTypes or manual validation.",
          initialCode: `// Create a flexible Card wrapper component
function Card() {
  // Your code here
}

// Create ProfileCard using Card
function ProfileCard() {
  // Your code here
}

// Create StatsCard using Card  
function StatsCard() {
  // Your code here
}

// Test your components
function App() {
  return (
    <div>
      <ProfileCard 
        name="Alice Johnson"
        avatar="avatar.jpg"
        bio="Full-stack developer with 5 years experience"
      />
      <StatsCard 
        title="Website Analytics"
        stats={[
          { label: "Users", value: "1,234" },
          { label: "Page Views", value: "5,678" },
          { label: "Sessions", value: "2,345" }
        ]}
      />
    </div>
  );
}`,
          solution: `// Flexible Card wrapper component
function Card({ 
  children, 
  className = "", 
  style = {}, 
  shadow = true,
  padding = "16px" 
}) {
  const cardStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: padding,
    margin: '8px',
    backgroundColor: '#fff',
    boxShadow: shadow ? '0 2px 4px rgba(0,0,0,0.1)' : 'none',
    ...style
  };

  return (
    <div className={\`card \${className}\`} style={cardStyle}>
      {children}
    </div>
  );
}

// ProfileCard using Card component
function ProfileCard({ name, avatar, bio }) {
  // Simple prop validation
  if (!name) {
    console.warn('ProfileCard: name prop is required');
    return null;
  }

  return (
    <Card style={{ maxWidth: '300px' }}>
      <div style={{ textAlign: 'center' }}>
        <img 
          src={avatar || 'https://via.placeholder.com/100x100?text=Avatar'} 
          alt={\`\${name} avatar\`}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            objectFit: 'cover',
            marginBottom: '10px'
          }}
        />
        <h3 style={{ margin: '0 0 8px 0' }}>{name}</h3>
        <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
          {bio || 'No bio available'}
        </p>
      </div>
    </Card>
  );
}

// StatsCard using Card component
function StatsCard({ title, stats = [] }) {
  // Prop validation
  if (!Array.isArray(stats)) {
    console.warn('StatsCard: stats should be an array');
    return null;
  }

  return (
    <Card style={{ minWidth: '250px' }}>
      <h3 style={{ margin: '0 0 16px 0', borderBottom: '2px solid #007BFF', paddingBottom: '8px' }}>
        {title || 'Statistics'}
      </h3>
      <div>
        {stats.map((stat, index) => (
          <div 
            key={index} 
            style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              marginBottom: '8px',
              padding: '4px 0'
            }}
          >
            <span style={{ color: '#666' }}>{stat.label}:</span>
            <strong style={{ color: '#007BFF' }}>{stat.value}</strong>
          </div>
        ))}
      </div>
    </Card>
  );
}

// Test components
function App() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      <ProfileCard 
        name="Alice Johnson"
        avatar="avatar.jpg"
        bio="Full-stack developer with 5 years experience"
      />
      <StatsCard 
        title="Website Analytics"
        stats={[
          { label: "Users", value: "1,234" },
          { label: "Page Views", value: "5,678" },
          { label: "Sessions", value: "2,345" }
        ]}
      />
    </div>
  );
}`,
          tests: [
            {
              description: "Card component should accept children prop",
              test: (code) => code.includes('children') && code.includes('{children}')
            },
            {
              description: "Components should use Card as wrapper",
              test: (code) => code.includes('<Card') || code.includes('Card>')
            },
            {
              description: "Should include prop validation or error handling",
              test: (code) => code.includes('console.warn') || code.includes('PropTypes') || code.includes('if (!')
            },
            {
              description: "ProfileCard should display name and avatar",
              test: (code) => code.includes('img') && code.includes('name')
            },
            {
              description: "StatsCard should handle stats array",
              test: (code) => code.includes('.map(') && code.includes('stats')
            }
          ]
        }
      ],
      multipleChoice: [
        {
          id: 1,
          question: "What is the correct way to define a functional component in React?",
          options: [
            "function MyComponent() { return <div>Hello</div>; }",
            "const MyComponent = function() { return <div>Hello</div>; }",
            "const MyComponent = () => { return <div>Hello</div>; }",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "All three syntaxes are valid ways to define functional components in React. The function declaration, function expression, and arrow function all work correctly."
        },
        {
          id: 2,
          question: "What must React component names start with?",
          options: [
            "A lowercase letter",
            "An uppercase letter", 
            "An underscore",
            "A number"
          ],
          correctAnswer: 1,
          explanation: "React component names must start with an uppercase letter. This is how React distinguishes between HTML elements and custom components."
        },
        {
          id: 3,
          question: "What should a React functional component return?",
          options: [
            "A string",
            "JSX elements or null",
            "A JavaScript object",
            "An array of strings"
          ],
          correctAnswer: 1,
          explanation: "React functional components should return JSX elements, null, or other valid React elements. JSX is the most common return type."
        },
        {
          id: 4,
          question: "How do you pass data to a React component?",
          options: [
            "Through global variables",
            "Through props",
            "Through the component's constructor",
            "Through component methods"
          ],
          correctAnswer: 1,
          explanation: "Props (properties) are the standard way to pass data from parent components to child components in React."
        },
        {
          id: 5,
          question: "What happens if you don't provide a default value for a prop and it's not passed?",
          options: [
            "The component will crash",
            "The prop will be undefined",
            "React will provide a default value automatically",
            "The component won't render"
          ],
          correctAnswer: 1,
          explanation: "If a prop is not provided and has no default value, it will be undefined. It's good practice to provide default values or handle undefined props."
        }
      ]
    }
  },
  {
    id: 2,
    title: "Using State with useState",
    description: "Master the useState hook for managing component state",
    difficulty: "beginner",
    estimatedTime: "45 minutes",
    status: "not-attempted",
    content: {
      theory: `
# Using State with useState

State allows components to store and manage changing data. The useState hook is the primary way to add state to functional components.

## Basic Usage
\`\`\`javascript
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
\`\`\`

## Key Concepts:
- useState returns an array with current state and setter function
- State updates trigger component re-renders
- State updates are asynchronous
- Use functional updates when new state depends on previous state
      `,
      example: `import React, { useState } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { id: Date.now(), text: inputValue }]);
      setInputValue('');
    }
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
}`,
      exercises: [
        {
          id: 1,
          title: "Color Manager",
          difficulty: "beginner",
          instruction: "Create a component that manages a list of favorite colors. Users should be able to add new colors and remove existing ones.",
          initialCode: `import React, { useState } from 'react';

function ColorManager() {
  // Add your state here
  
  // Add your functions here
  
  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
}`,
          solution: `import React, { useState } from 'react';

function ColorManager() {
  const [colors, setColors] = useState(['red', 'blue', 'green']);
  const [newColor, setNewColor] = useState('');

  const addColor = () => {
    if (newColor.trim() && !colors.includes(newColor)) {
      setColors([...colors, newColor.trim()]);
      setNewColor('');
    }
  };

  const removeColor = (colorToRemove) => {
    setColors(colors.filter(color => color !== colorToRemove));
  };

  return (
    <div>
      <input
        value={newColor}
        onChange={(e) => setNewColor(e.target.value)}
        placeholder="Enter a color"
      />
      <button onClick={addColor}>Add Color</button>
      <div>
        <h3>Favorite Colors:</h3>
        {colors.map(color => (
          <div key={color} style={{ margin: '5px 0' }}>
            <span style={{ marginRight: '10px' }}>{color}</span>
            <button onClick={() => removeColor(color)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}`,
          tests: [
            {
              description: "Should use useState hook",
              test: (code) => code.includes('useState')
            },
            {
              description: "Should manage colors array state",
              test: (code) => code.includes('colors') && code.includes('setColors')
            },
            {
              description: "Should have input for new color",
              test: (code) => code.includes('input') && code.includes('value=')
            },
            {
              description: "Should have add functionality",
              test: (code) => code.includes('add') || code.includes('Add')
            }
          ]
        },
        {
          id: 2,
          title: "Advanced Counter with History",
          difficulty: "intermediate",
          instruction: "Create a counter that tracks its history. Users should be able to increment, decrement, reset, and view/undo previous operations.",
          initialCode: `import React, { useState } from 'react';

function AdvancedCounter() {
  // Add state for count and history
  
  // Add functions for operations
  
  return (
    <div>
      {/* Your counter UI here */}
    </div>
  );
}`,
          solution: `import React, { useState } from 'react';

function AdvancedCounter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([{ action: 'initialized', value: 0, timestamp: Date.now() }]);

  const addToHistory = (action, newValue) => {
    const historyEntry = {
      action,
      value: newValue,
      timestamp: Date.now()
    };
    setHistory(prev => [...prev, historyEntry]);
  };

  const increment = () => {
    const newCount = count + 1;
    setCount(newCount);
    addToHistory('increment', newCount);
  };

  const decrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    addToHistory('decrement', newCount);
  };

  const reset = () => {
    setCount(0);
    addToHistory('reset', 0);
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      const previousEntry = newHistory[newHistory.length - 1];
      setHistory(newHistory);
      setCount(previousEntry.value);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <div style={{ fontSize: '32px', textAlign: 'center', margin: '20px 0' }}>
        Count: {count}
      </div>
      
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '20px' }}>
        <button onClick={increment}>+1</button>
        <button onClick={decrement}>-1</button>
        <button onClick={reset}>Reset</button>
        <button onClick={undo} disabled={history.length <= 1}>
          Undo
        </button>
      </div>

      <div>
        <h4>History:</h4>
        <div style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #ddd', padding: '10px' }}>
          {history.slice(-10).reverse().map((entry, index) => (
            <div key={entry.timestamp} style={{ marginBottom: '5px', fontSize: '14px' }}>
              {entry.action}: {entry.value} 
              <span style={{ color: '#666', marginLeft: '10px' }}>
                ({new Date(entry.timestamp).toLocaleTimeString()})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}`,
          tests: [
            {
              description: "Should track count state",
              test: (code) => code.includes('count') && code.includes('setCount')
            },
            {
              description: "Should track history state",
              test: (code) => code.includes('history') && code.includes('setHistory')
            },
            {
              description: "Should have increment, decrement, and reset functions",
              test: (code) => code.includes('increment') && code.includes('decrement') && code.includes('reset')
            },
            {
              description: "Should have undo functionality",
              test: (code) => code.includes('undo') || code.includes('Undo')
            }
          ]
        },
        {
          id: 3,
          title: "Complex State Management with useReducer Pattern",
          difficulty: "expert",
          instruction: "Create a shopping cart component using useState to simulate useReducer pattern. Implement add, remove, update quantity, clear cart, and apply coupon functionality with complex state interactions.",
          initialCode: `import React, { useState } from 'react';

function ShoppingCart() {
  // Initialize complex state structure
  
  // Implement action handlers
  
  return (
    <div>
      {/* Shopping cart UI */}
    </div>
  );
}`,
          solution: `import React, { useState } from 'react';

function ShoppingCart() {
  const [cartState, setCartState] = useState({
    items: [],
    coupon: null,
    totalItems: 0,
    subtotal: 0,
    discount: 0,
    total: 0
  });

  const products = [
    { id: 1, name: 'Laptop', price: 999 },
    { id: 2, name: 'Phone', price: 599 },
    { id: 3, name: 'Headphones', price: 199 }
  ];

  const coupons = {
    'SAVE10': { discount: 0.1, minAmount: 100 },
    'SAVE20': { discount: 0.2, minAmount: 500 }
  };

  const calculateTotals = (items, coupon) => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    let discount = 0;
    if (coupon && subtotal >= coupons[coupon].minAmount) {
      discount = subtotal * coupons[coupon].discount;
    }
    
    const total = subtotal - discount;
    
    return { totalItems, subtotal, discount, total };
  };

  const updateCartState = (updates) => {
    setCartState(prev => {
      const newState = { ...prev, ...updates };
      const totals = calculateTotals(newState.items, newState.coupon);
      return { ...newState, ...totals };
    });
  };

  const addToCart = (product) => {
    const existingItem = cartState.items.find(item => item.id === product.id);
    
    if (existingItem) {
      const updatedItems = cartState.items.map(item =>
        item.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateCartState({ items: updatedItems });
    } else {
      const newItem = { ...product, quantity: 1 };
      updateCartState({ items: [...cartState.items, newItem] });
    }
  };

  const removeFromCart = (productId) => {
    const updatedItems = cartState.items.filter(item => item.id !== productId);
    updateCartState({ items: updatedItems });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    const updatedItems = cartState.items.map(item =>
      item.id === productId ? { ...item, quantity } : item
    );
    updateCartState({ items: updatedItems });
  };

  const applyCoupon = (couponCode) => {
    if (coupons[couponCode]) {
      updateCartState({ coupon: couponCode });
    } else {
      alert('Invalid coupon code');
    }
  };

  const clearCart = () => {
    updateCartState({ items: [], coupon: null });
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px' }}>
      <h2>Shopping Cart ({cartState.totalItems} items)</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Products:</h3>
        {products.map(product => (
          <div key={product.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
            <span>{product.name} - \${product.price}</span>
            <button 
              onClick={() => addToCart(product)}
              style={{ marginLeft: '10px' }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Cart Items:</h3>
        {cartState.items.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          cartState.items.map(item => (
            <div key={item.id} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ddd' }}>
              <span>{item.name} - \${item.price} x {item.quantity}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                style={{ width: '60px', margin: '0 10px' }}
                min="0"
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))
        )}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Coupon:</h3>
        <input
          type="text"
          placeholder="Enter coupon code"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              applyCoupon(e.target.value);
              e.target.value = '';
            }
          }}
          style={{ marginRight: '10px' }}
        />
        <small>Available: SAVE10 (10% off $100+), SAVE20 (20% off $500+)</small>
        {cartState.coupon && (
          <div style={{ color: 'green', marginTop: '5px' }}>
            Applied: {cartState.coupon}
          </div>
        )}
      </div>

      <div style={{ border: '2px solid #007BFF', padding: '15px', marginBottom: '20px' }}>
        <div>Subtotal: \${cartState.subtotal.toFixed(2)}</div>
        {cartState.discount > 0 && (
          <div style={{ color: 'green' }}>Discount: -\${cartState.discount.toFixed(2)}</div>
        )}
        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
          Total: \${cartState.total.toFixed(2)}
        </div>
      </div>

      <button 
        onClick={clearCart}
        style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 20px' }}
      >
        Clear Cart
      </button>
    </div>
  );
}`,
          tests: [
            {
              description: "Should manage complex cart state structure",
              test: (code) => code.includes('items') && code.includes('total') && code.includes('subtotal')
            },
            {
              description: "Should implement add to cart functionality",
              test: (code) => code.includes('addToCart') || code.includes('add')
            },
            {
              description: "Should handle quantity updates",
              test: (code) => code.includes('updateQuantity') || code.includes('quantity')
            },
            {
              description: "Should implement coupon functionality",
              test: (code) => code.includes('coupon') && code.includes('discount')
            },
            {
              description: "Should calculate totals dynamically",
              test: (code) => code.includes('calculate') || (code.includes('reduce') && code.includes('total'))
            }
          ]
        }
      ],
      multipleChoice: [
        {
          id: 1,
          question: "What does the useState hook return?",
          options: [
            "Just the current state value",
            "Just the setter function",
            "An array with current state and setter function",
            "An object with state and setState properties"
          ],
          correctAnswer: 2,
          explanation: "useState returns an array where the first element is the current state value and the second element is the setter function to update that state."
        },
        {
          id: 2,
          question: "When does a React component re-render?",
          options: [
            "Every second automatically",
            "When setState is called with a new value",
            "When any function is called",
            "When props change or state is updated"
          ],
          correctAnswer: 3,
          explanation: "React components re-render when their props change or when their state is updated using the setState function."
        },
        {
          id: 3,
          question: "What happens if you call setState with the same value?",
          options: [
            "React will always re-render",
            "React will skip the re-render",
            "It will cause an error",
            "The component will unmount"
          ],
          correctAnswer: 1,
          explanation: "React uses Object.is() to compare the current state with the new state. If they're the same, React will skip the re-render for performance optimization."
        },
        {
          id: 4,
          question: "How should you update state that depends on the previous state?",
          options: [
            "setState(prevState + 1)",
            "setState(state + 1)",
            "setState(prev => prev + 1)",
            "setState(currentState + 1)"
          ],
          correctAnswer: 2,
          explanation: "When the new state depends on the previous state, you should use the functional update pattern: setState(prev => prev + 1). This ensures you're working with the most current state value."
        },
        {
          id: 5,
          question: "What is the initial value passed to useState?",
          options: [
            "It becomes the default value forever",
            "It's only used on the first render",
            "It's used every time the component renders",
            "It's ignored after the first update"
          ],
          correctAnswer: 1,
          explanation: "The initial value passed to useState is only used during the first render of the component. After that, React uses the current state value maintained internally."
        }
      ]
    }
  },
  {
    id: 3,
    title: "Props and Component Communication",
    description: "Learn how components communicate through props",
    difficulty: "beginner",
    estimatedTime: "40 minutes",
    status: "not-attempted",
    content: {
      theory: `
# Props and Component Communication

Props (properties) are how components receive data from their parent components. They are read-only and help make components reusable.

## Passing Props
\`\`\`javascript
function Parent() {
  return <Child name="Alice" age={25} />;
}

function Child(props) {
  return <p>Hello {props.name}, you are {props.age} years old!</p>;
}
\`\`\`

## Destructuring Props
\`\`\`javascript
function Child({ name, age }) {
  return <p>Hello {name}, you are {age} years old!</p>;
}
\`\`\`

## Default Props
\`\`\`javascript
function Greeting({ name = "World" }) {
  return <h1>Hello, {name}!</h1>;
}
\`\`\`
      `,
      example: `// Parent component managing state and passing to children
function ShoppingApp() {
  const [items, setItems] = useState([
    { id: 1, name: 'Apple', price: 1.99, quantity: 0 },
    { id: 2, name: 'Banana', price: 0.99, quantity: 0 }
  ]);

  const updateQuantity = (id, newQuantity) => {
    setItems(items.map(currentItem => 
      currentItem.id === id ? { ...currentItem, quantity: newQuantity } : currentItem
    ));
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      {items.map(currentItem => (
        <ShoppingItem
          key={currentItem.id}
          item={currentItem}
          onQuantityChange={updateQuantity}
        />
      ))}
      <Total items={items} />
    </div>
  );
}

function ShoppingItem({ item, onQuantityChange }) {
  return (
    <div>
      <span>{item.name} - $\{item.price}</span>
      <button onClick={() => onQuantityChange(item.id, item.quantity + 1)}>
        Add
      </button>
      <span>Qty: {item.quantity}</span>
    </div>
  );
}

function Total({ items }) {
  const totalPrice = items.reduce((sum, currentItem) => sum + (currentItem.price * currentItem.quantity), 0);
  return <h2>Total: $\{totalPrice.toFixed(2)}</h2>;
}`,
      exercises: [
        {
          id: 1,
          title: "Blog Post System",
          difficulty: "beginner",
          instruction: "Create a blog post component system. Create a BlogPost component that receives title, author, date, and content as props, and a BlogList component that renders multiple blog posts.",
          initialCode: `// Create your BlogPost component
function BlogPost() {
  // Your code here
}

// Create your BlogList component  
function BlogList() {
  const posts = [
    {
      id: 1,
      title: "Learning React",
      author: "Jane Doe",
      date: "2024-01-15",
      content: "React is a powerful library for building user interfaces..."
    },
    {
      id: 2,
      title: "JavaScript Tips",
      author: "John Smith", 
      date: "2024-01-10",
      content: "Here are some useful JavaScript tips and tricks..."
    }
  ];
  
  // Your code here
}`,
          solution: `function BlogPost({ title, author, date, content }) {
  return (
    <article style={{
      border: '1px solid #ddd',
      padding: '20px',
      margin: '10px 0',
      borderRadius: '5px'
    }}>
      <h2>{title}</h2>
      <div style={{ color: '#666', marginBottom: '10px' }}>
        By {author} on {date}
      </div>
      <p>{content}</p>
    </article>
  );
}

function BlogList() {
  const posts = [
    {
      id: 1,
      title: "Learning React",
      author: "Jane Doe",
      date: "2024-01-15",
      content: "React is a powerful library for building user interfaces..."
    },
    {
      id: 2,
      title: "JavaScript Tips",
      author: "John Smith", 
      date: "2024-01-10",
      content: "Here are some useful JavaScript tips and tricks..."
    }
  ];
  
  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <BlogPost
          key={post.id}
          title={post.title}
          author={post.author}
          date={post.date}
          content={post.content}
        />
      ))}
    </div>
  );
}`,
          tests: [
            {
              description: "BlogPost should accept and display title prop",
              test: (code) => code.includes('title') && code.includes('{title}')
            },
            {
              description: "BlogPost should accept and display author prop",
              test: (code) => code.includes('author') && code.includes('{author}')
            },
            {
              description: "BlogList should map over posts array",
              test: (code) => code.includes('.map(') && code.includes('posts')
            },
            {
              description: "BlogList should render BlogPost components",
              test: (code) => code.includes('<BlogPost') || code.includes('BlogPost')
            }
          ]
        },
        {
          id: 2,
          title: "Product Listing with Callbacks",
          difficulty: "intermediate",
          instruction: "Create a product listing system where ProductCard components can trigger actions in their parent. Implement add to cart, add to wishlist, and view details callbacks.",
          initialCode: `// Create your ProductCard component
function ProductCard() {
  // Your code here
}

// Create your ProductListing component
function ProductListing() {
  const products = [
    { id: 1, name: "Laptop", price: 999, image: "laptop.jpg", inStock: true },
    { id: 2, name: "Phone", price: 599, image: "phone.jpg", inStock: false },
    { id: 3, name: "Headphones", price: 199, image: "headphones.jpg", inStock: true }
  ];
  
  // Add your callback functions here
  
  return (
    <div>
      {/* Your code here */}
    </div>
  );
}`,
          solution: `import React, { useState } from 'react';

function ProductCard({ product, onAddToCart, onAddToWishlist, onViewDetails }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '10px',
      maxWidth: '250px',
      textAlign: 'center'
    }}>
      <img 
        src={product.image} 
        alt={product.name}
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '10px'
        }}
      />
      <h3>{product.name}</h3>
      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#007BFF' }}>
        \${product.price}
      </p>
      <p style={{ color: product.inStock ? 'green' : 'red' }}>
        {product.inStock ? 'In Stock' : 'Out of Stock'}
      </p>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          onClick={() => onAddToCart(product)}
          disabled={!product.inStock}
          style={{
            padding: '8px 16px',
            backgroundColor: product.inStock ? '#007BFF' : '#ccc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: product.inStock ? 'pointer' : 'not-allowed'
          }}
        >
          Add to Cart
        </button>
        <button
          onClick={() => onAddToWishlist(product)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          Add to Wishlist
        </button>
        <button
          onClick={() => onViewDetails(product)}
          style={{
            padding: '8px 16px',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px'
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

function ProductListing() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  
  const products = [
    { id: 1, name: "Laptop", price: 999, image: "laptop.jpg", inStock: true },
    { id: 2, name: "Phone", price: 599, image: "phone.jpg", inStock: false },
    { id: 3, name: "Headphones", price: 199, image: "headphones.jpg", inStock: true }
  ];
  
  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    alert(\`Added \${product.name} to cart!\`);
  };

  const handleAddToWishlist = (product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) {
        alert(\`\${product.name} is already in your wishlist!\`);
        return prev;
      } else {
        alert(\`Added \${product.name} to wishlist!\`);
        return [...prev, product];
      }
    });
  };

  const handleViewDetails = (product) => {
    alert(\`Viewing details for \${product.name}\\nPrice: $\${product.price}\\nStock: \${product.inStock ? 'Available' : 'Out of Stock'}\`);
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between' }}>
        <h1>Product Listing</h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>Cart: {getTotalItems()} items</span>
          <span>Wishlist: {wishlist.length} items</span>
        </div>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onAddToWishlist={handleAddToWishlist}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>
    </div>
  );
}`,
          tests: [
            {
              description: "ProductCard should accept product prop",
              test: (code) => code.includes('product') && code.includes('product.')
            },
            {
              description: "Should implement callback props for actions",
              test: (code) => code.includes('onAdd') || code.includes('onClick=')
            },
            {
              description: "ProductListing should pass callback functions",
              test: (code) => code.includes('handle') || code.includes('on')
            },
            {
              description: "Should manage cart and wishlist state",
              test: (code) => code.includes('cart') && code.includes('wishlist')
            }
          ]
        },
        {
          id: 3,
          title: "Advanced Props with Render Props Pattern",
          difficulty: "expert",
          instruction: "Create a DataProvider component that uses the render props pattern to share data fetching logic. Create consumers that display the data in different formats.",
          initialCode: `// Create your DataProvider component using render props pattern
function DataProvider() {
  // Your code here
}

// Create components that use the DataProvider
function UserList() {
  // Your code here
}

function UserCards() {
  // Your code here
}

// Test your components
function App() {
  return (
    <div>
      {/* Your render props implementation here */}
    </div>
  );
}`,
          solution: `import React, { useState, useEffect } from 'react';

// DataProvider component using render props pattern
function DataProvider({ children }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Simulate API call
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock user data
        const users = [
          { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Developer", avatar: "avatar1.jpg" },
          { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Designer", avatar: "avatar2.jpg" },
          { id: 3, name: "Carol Davis", email: "carol@example.com", role: "Manager", avatar: "avatar3.jpg" }
        ];
        
        setData(users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const refetch = () => {
    fetchData();
  };

  // Render props pattern - call children as function with data
  return children({ data, loading, error, refetch });
}

// Component that renders data as a list
function UserList({ data, loading, error, refetch }) {
  if (loading) return <div>Loading users...</div>;
  if (error) return <div>Error: {error} <button onClick={refetch}>Retry</button></div>;

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', margin: '10px' }}>
      <h3>User List</h3>
      <ul>
        {data.map(user => (
          <li key={user.id} style={{ marginBottom: '8px' }}>
            <strong>{user.name}</strong> - {user.email} ({user.role})
          </li>
        ))}
      </ul>
      <button onClick={refetch} style={{ marginTop: '10px' }}>Refresh Data</button>
    </div>
  );
}

// Component that renders data as cards
function UserCards({ data, loading, error, refetch }) {
  if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}>Loading...</div>;
  if (error) return (
    <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
      Error: {error} 
      <button onClick={refetch} style={{ marginLeft: '10px' }}>Retry</button>
    </div>
  );

  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', margin: '10px' }}>
      <h3>User Cards</h3>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {data.map(user => (
          <div key={user.id} style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '15px',
            minWidth: '200px',
            textAlign: 'center'
          }}>
            <img 
              src={user.avatar} 
              alt={user.name}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '10px'
              }}
            />
            <h4 style={{ margin: '5px 0' }}>{user.name}</h4>
            <p style={{ margin: '5px 0', color: '#666' }}>{user.email}</p>
            <span style={{
              display: 'inline-block',
              padding: '4px 8px',
              backgroundColor: '#007BFF',
              color: 'white',
              borderRadius: '12px',
              fontSize: '12px'
            }}>
              {user.role}
            </span>
          </div>
        ))}
      </div>
      <button onClick={refetch} style={{ marginTop: '15px' }}>Refresh Cards</button>
    </div>
  );
}

// Test application
function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Render Props Pattern Example</h1>
      
      {/* Using render props with function as children */}
      <DataProvider>
        {({ data, loading, error, refetch }) => (
          <div>
            <UserList 
              data={data} 
              loading={loading} 
              error={error} 
              refetch={refetch} 
            />
            <UserCards 
              data={data} 
              loading={loading} 
              error={error} 
              refetch={refetch} 
            />
          </div>
        )}
      </DataProvider>
      
      {/* Alternative: using render prop */}
      <DataProvider>
        {(props) => (
          <div style={{ marginTop: '20px' }}>
            <h3>Alternative Usage</h3>
            {props.loading ? (
              <p>Loading alternative view...</p>
            ) : (
              <p>Found {props.data.length} users</p>
            )}
          </div>
        )}
      </DataProvider>
    </div>
  );
}`,
          tests: [
            {
              description: "DataProvider should use render props pattern with children function",
              test: (code) => code.includes('children(') && code.includes('data') && code.includes('loading')
            },
            {
              description: "Should manage loading, error, and data states",
              test: (code) => code.includes('loading') && code.includes('error') && code.includes('data')
            },
            {
              description: "Components should receive props from DataProvider",
              test: (code) => code.includes('loading') && code.includes('error') && code.includes('refetch')
            },
            {
              description: "Should implement data fetching simulation",
              test: (code) => code.includes('useEffect') && code.includes('setTimeout')
            },
            {
              description: "Should use the render props pattern in App component",
              test: (code) => code.includes('{(') || code.includes('children')
            }
          ]
        }
      ],
      multipleChoice: [
        {
          id: 1,
          question: "How do you pass data from a parent component to a child component?",
          options: [
            "Through global variables",
            "Through props",
            "Through direct function calls",
            "Through the DOM"
          ],
          correctAnswer: 1,
          explanation: "Props are the standard way to pass data from parent components to child components in React."
        },
        {
          id: 2,
          question: "Can you modify props inside a child component?",
          options: [
            "Yes, props are mutable",
            "No, props are read-only",
            "Only certain types of props",
            "Yes, but only with special syntax"
          ],
          correctAnswer: 1,
          explanation: "Props are read-only in React. Child components cannot modify the props they receive from their parent."
        },
        {
          id: 3,
          question: "What is prop drilling?",
          options: [
            "A method to validate props",
            "Passing props through multiple component levels",
            "A way to optimize prop performance",
            "A debugging technique for props"
          ],
          correctAnswer: 1,
          explanation: "Prop drilling refers to the process of passing props through multiple levels of components to reach a deeply nested child component."
        },
        {
          id: 4,
          question: "How do you provide default values for props?",
          options: [
            "Using defaultProps",
            "Using default parameters in function signature",
            "Using the || operator",
            "All of the above"
          ],
          correctAnswer: 3,
          explanation: "You can provide default props using defaultProps, default parameters in ES6, or the logical OR operator. All approaches work in React."
        },
        {
          id: 5,
          question: "What is the render props pattern?",
          options: [
            "A way to render props as text",
            "A technique for sharing code between components using a prop whose value is a function",
            "A method to style props",
            "A way to validate prop types"
          ],
          correctAnswer: 1,
          explanation: "The render props pattern is a technique for sharing code between React components using a prop whose value is a function that returns JSX."
        }
      ]
    }
  },
  {
    id: 4,
    title: "Side Effects with useEffect",
    description: "Learn to handle side effects, API calls, and cleanup in React",
    difficulty: "intermediate",
    estimatedTime: "60 minutes",
    status: "not-attempted",
    content: {
      theory: `
# Side Effects with useEffect

The useEffect hook allows you to perform side effects in functional components. This includes data fetching, setting up subscriptions, and manually changing the DOM.

## Basic Usage
\`\`\`javascript
import React, { useState, useEffect } from 'react';

function DataComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // This runs after every render
    console.log('Component rendered');
  });
  
  return <div>{data}</div>;
}
\`\`\`

## Effect with Dependencies
\`\`\`javascript
useEffect(() => {
  // This runs only when count changes
  document.title = \`Count: \${count}\`;
}, [count]);
\`\`\`

## Cleanup
\`\`\`javascript
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);
  
  // Cleanup function
  return () => {
    clearInterval(timer);
  };
}, []);
\`\`\`

## Key Concepts:
- useEffect runs after every render by default
- Dependency array controls when effect runs
- Return a cleanup function to prevent memory leaks
- Empty dependency array runs effect only once
      `,
      example: `import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        
        if (!isCancelled) {
          setUser(userData);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchUser();

    // Cleanup function
    return () => {
      isCancelled = true;
    };
  }, [userId]); // Re-run when userId changes

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>No user found</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
}`,
      exercise: {
        instruction: "Create a Timer component that displays elapsed time in seconds. The timer should start automatically and clean up when the component unmounts. Add start/stop functionality.",
        initialCode: `import React, { useState, useEffect } from 'react';

function Timer() {
  // Add your state and effects here
  
  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
}

export default Timer;`,
        solution: `import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    let interval = null;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prevSeconds => prevSeconds + 1);
      }, 1000);
    }

    // Cleanup function
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(prevRunning => !prevRunning);
  };

  const handleReset = () => {
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Timer: {seconds}s</h2>
      <button onClick={handleStartStop}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
      <button onClick={handleReset} style={{ marginLeft: '10px' }}>
        Reset
      </button>
    </div>
  );
}

export default Timer;`,
        tests: [
          {
            description: "Should use useEffect hook",
            test: (code) => code.includes('useEffect')
          },
          {
            description: "Should manage seconds state",
            test: (code) => code.includes('seconds') && code.includes('setSeconds')
          },
          {
            description: "Should have start/stop functionality",
            test: (code) => code.includes('isRunning') || code.includes('running')
          },
          {
            description: "Should use setInterval for timing",
            test: (code) => code.includes('setInterval') || code.includes('interval')
          },
          {
            description: "Should include cleanup function",
            test: (code) => code.includes('clearInterval') || code.includes('return')
          }
        ]
      }
    }
  },
  {
    id: 5,
    title: "Context API & useContext",
    description: "Share state across components without prop drilling",
    difficulty: "intermediate",
    estimatedTime: "50 minutes",
    status: "not-attempted",
    content: {
      theory: `
# Context API & useContext

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

## Creating Context
\`\`\`javascript
import React, { createContext, useContext } from 'react';

const ThemeContext = createContext();

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Header />
    </ThemeContext.Provider>
  );
}
\`\`\`

## Using Context
\`\`\`javascript
function Header() {
  const theme = useContext(ThemeContext);
  return <h1 className={theme}>Header</h1>;
}
\`\`\`

## Context with State
\`\`\`javascript
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
\`\`\`

## Key Benefits:
- Avoid prop drilling through multiple levels
- Share global state (theme, user, settings)
- Cleaner component APIs
- Better separation of concerns
      `,
      example: `import React, { createContext, useContext, useState } from 'react';

// Create contexts
const UserContext = createContext();
const ThemeContext = createContext();

// Provider components
function UserProvider({ children }) {
  const [user, setUser] = useState({ name: 'John Doe', email: 'john@example.com' });
  
  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);
  
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Components using context
function Header() {
  const { user, logout } = useContext(UserContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <header style={{ 
      backgroundColor: theme === 'dark' ? '#333' : '#fff',
      color: theme === 'dark' ? '#fff' : '#333'
    }}>
      <h1>Welcome, {user?.name || 'Guest'}</h1>
      <button onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'light' : 'dark'} theme
      </button>
      {user && <button onClick={logout}>Logout</button>}
    </header>
  );
}

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    </UserProvider>
  );
}`,
      exercise: {
        instruction: "Create a shopping cart system using Context API. Implement CartProvider with functions to add items, remove items, and calculate total. Create components that use this context.",
        initialCode: `import React, { createContext, useContext, useState } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component
function CartProvider({ children }) {
  // Add your cart state and functions here
  
  return (
    <CartContext.Provider value={{}}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
function useCart() {
  // Add your hook logic here
}

// CartDisplay component
function CartDisplay() {
  // Use cart context here
  
  return (
    <div>
      {/* Display cart items and total */}
    </div>
  );
}

// ProductCard component
function ProductCard({ product }) {
  // Use cart context to add items
  
  return (
    <div>
      {/* Display product and add to cart button */}
    </div>
  );
}`,
        solution: `import React, { createContext, useContext, useState } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component
function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };
  
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };
  
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}

// CartDisplay component
function CartDisplay() {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  
  return (
    <div style={{ border: '1px solid #ddd', padding: '20px', margin: '20px' }}>
      <h3>Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <div key={item.id} style={{ marginBottom: '10px' }}>
              <span>{item.name} - $\{item.price}</span>
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                style={{ margin: '0 10px', width: '50px' }}
              />
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
            Total: $\{getTotalPrice().toFixed(2)}
          </div>
        </>
      )}
    </div>
  );
}

// ProductCard component
function ProductCard({ product }) {
  const { addToCart } = useCart();
  
  return (
    <div style={{ border: '1px solid #ddd', padding: '15px', margin: '10px' }}>
      <h4>{product.name}</h4>
      <p>Price: $\{product.price}</p>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
}`,
        tests: [
          {
            description: "Should create CartContext",
            test: (code) => code.includes('createContext')
          },
          {
            description: "Should use useContext hook",
            test: (code) => code.includes('useContext')
          },
          {
            description: "Should have cart state management",
            test: (code) => code.includes('cartItems') || code.includes('cart')
          },
          {
            description: "Should have addToCart function",
            test: (code) => code.includes('addToCart') || code.includes('add')
          },
          {
            description: "Should provide context value",
            test: (code) => code.includes('.Provider') && code.includes('value=')
          }
        ]
      }
    }
  },
  {
    id: 6,
    title: "Event Handling & Forms",
    description: "Master form handling, controlled components, and user interactions",
    difficulty: "beginner",
    estimatedTime: "45 minutes",
    status: "not-attempted",
    content: {
      theory: `
# Event Handling & Forms

React handles events through SyntheticEvents, which wrap native DOM events to provide consistent behavior across browsers.

## Basic Event Handling
\`\`\`javascript
function Button() {
  const handleClick = (event) => {
    event.preventDefault();
    console.log('Button clicked!');
  };
  
  return <button onClick={handleClick}>Click me</button>;
}
\`\`\`

## Controlled Components
\`\`\`javascript
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
\`\`\`

## Form Validation
\`\`\`javascript
const [errors, setErrors] = useState({});

const validateForm = () => {
  const newErrors = {};
  if (!email) newErrors.email = 'Email is required';
  if (!password || password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
  }
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
\`\`\`

## Key Concepts:
- Always use controlled components for form inputs
- Handle form submission with onSubmit
- Prevent default behavior when needed
- Validate user input and show error messages
      `,
      example: `import React, { useState } from 'react';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    category: 'general'
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Form submitted:', formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '', category: 'general' });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Thank you for your message!</h3>
        <button onClick={() => setSubmitted(false)}>Send another message</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '500px', margin: '0 auto' }}>
      <div style={{ marginBottom: '15px' }}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Category:</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px' }}
        >
          <option value="general">General</option>
          <option value="support">Support</option>
          <option value="feedback">Feedback</option>
        </select>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="4"
          style={{ width: '100%', padding: '8px' }}
        />
        {errors.message && <span style={{ color: 'red' }}>{errors.message}</span>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          padding: '10px 20px',
          backgroundColor: isSubmitting ? '#ccc' : '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px'
        }}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}`,
      exercise: {
        instruction: "Create a user registration form with fields for username, email, password, and confirm password. Include validation for all fields and show appropriate error messages.",
        initialCode: `import React, { useState } from 'react';

function RegistrationForm() {
  // Add your state here
  
  // Add your handler functions here
  
  return (
    <form>
      {/* Add your form fields here */}
    </form>
  );
}

export default RegistrationForm;`,
        solution: `import React, { useState } from 'react';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Registration successful:', formData);
      alert('Registration successful!');
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
      <h2>Register</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
        {errors.username && <div style={{ color: 'red', fontSize: '14px' }}>{errors.username}</div>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
        {errors.email && <div style={{ color: 'red', fontSize: '14px' }}>{errors.email}</div>}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
        {errors.password && <div style={{ color: 'red', fontSize: '14px' }}>{errors.password}</div>}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Confirm Password:</label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', marginTop: '5px' }}
        />
        {errors.confirmPassword && <div style={{ color: 'red', fontSize: '14px' }}>{errors.confirmPassword}</div>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: isSubmitting ? '#ccc' : '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '16px'
        }}
      >
        {isSubmitting ? 'Registering...' : 'Register'}
      </button>
    </form>
  );
}

export default RegistrationForm;`,
        tests: [
          {
            description: "Should have form fields for username, email, password, and confirm password",
            test: (code) => code.includes('username') && code.includes('email') && code.includes('password') && code.includes('confirmPassword')
          },
          {
            description: "Should handle form submission",
            test: (code) => code.includes('onSubmit') || code.includes('handleSubmit')
          },
          {
            description: "Should include form validation",
            test: (code) => code.includes('validate') || code.includes('errors')
          },
          {
            description: "Should use controlled components",
            test: (code) => code.includes('value=') && code.includes('onChange')
          },
          {
            description: "Should prevent default form submission",
            test: (code) => code.includes('preventDefault')
          }
        ]
      }
    }
  }
];
