"""
Simple Calculator Program
This calculator demonstrates Python basics including:
- Functions
- User input
- Conditional statements (if/elif/else)
- While loops
- Error handling
"""

def add(x, y):
    """Add two numbers"""
    return x + y

def subtract(x, y):
    """Subtract second number from first"""
    return x - y

def multiply(x, y):
    """Multiply two numbers"""
    return x * y

def divide(x, y):
    """Divide first number by second"""
    if y == 0:
        return "Error: Cannot divide by zero!"
    return x / y

def calculator():
    """Main calculator function"""
    print("=" * 40)
    print("Welcome to Python Calculator!")
    print("=" * 40)
    
    while True:
        # Display menu
        print("\nSelect operation:")
        print("1. Add")
        print("2. Subtract")
        print("3. Multiply")
        print("4. Divide")
        print("5. Exit")
        
        # Get user choice
        choice = input("\nEnter choice (1/2/3/4/5): ")
        
        # Exit condition
        if choice == '5':
            print("Thank you for using the calculator. Goodbye!")
            break
        
        # Validate choice
        if choice not in ['1', '2', '3', '4']:
            print("Invalid input! Please enter a number between 1 and 5.")
            continue
        
        # Get numbers from user with error handling
        try:
            num1 = float(input("Enter first number: "))
            num2 = float(input("Enter second number: "))
        except ValueError:
            print("Invalid input! Please enter valid numbers.")
            continue
        
        # Perform calculation based on choice
        if choice == '1':
            result = add(num1, num2)
            operation = "+"
        elif choice == '2':
            result = subtract(num1, num2)
            operation = "-"
        elif choice == '3':
            result = multiply(num1, num2)
            operation = "*"
        elif choice == '4':
            result = divide(num1, num2)
            operation = "/"
        
        # Display result
        print(f"\n{num1} {operation} {num2} = {result}")
        print("-" * 40)

# Run the calculator
if __name__ == "__main__":
    calculator()