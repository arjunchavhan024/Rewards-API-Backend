# Rewards API Backend

A comprehensive NestJS-based rewards management system with MongoDB integration, featuring real-time updates, analytics, and complete API documentation.

## 🚀 Features

### Core Features
- **User Management**: Mock user system with seeded data
- **Rewards Tracking**: Real-time point accumulation and balance management
- **Transaction History**: Complete transaction logging with pagination
- **Redemption System**: Points-based reward redemption with validation
- **Analytics Dashboard**: Comprehensive rewards distribution analytics
- **Real-time Updates**: WebSocket integration for live point updates
- **API Documentation**: Complete Swagger/OpenAPI documentation

### Advanced Features
- **Data Validation**: Comprehensive input validation using class-validator
- **Error Handling**: Standardized error responses with meaningful messages
- **Pagination**: Efficient pagination for all list endpoints
- **Database Optimization**: Proper indexing and aggregation pipelines
- **Testing**: Comprehensive unit tests with Jest
- **TypeScript**: Full TypeScript support with proper typing

## 🏗️ Architecture

### Project Structure
```
src/
├── modules/
│   ├── users/           # User management
│   ├── rewards/         # Reward points management
│   ├── transactions/    # Transaction tracking
│   ├── redemptions/     # Point redemption system
│   └── analytics/       # Analytics and reporting
├── common/
│   ├── dto/            # Data transfer objects
│   ├── interfaces/     # TypeScript interfaces
│   └── filters/        # Exception filters
├── config/             # Configuration files
└── main.ts            # Application entry point
```

### Database Schema

#### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (unique),
  name: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Rewards Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  totalPoints: Number (min: 0),
  updatedAt: Date
}
```

#### Transactions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  amount: Number (min: 0),
  category: String,
  pointsEarned: Number (min: 0),
  timestamp: Date
}
```

#### Redemptions Collection
```javascript
{
  _id: ObjectId,
  userId: ObjectId (ref: User),
  pointsRedeemed: Number (min: 0),
  rewardType: String (enum: cashback, voucher, discount, gift_card),
  rewardDetails: String,
  rewardValue: Number (min: 0),
  timestamp: Date
}
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rewards-api-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/rewards-api
   PORT=3000
   FRONTEND_URL=http://localhost:3001
   ```

4. **Start MongoDB**
   ```bash
   # Using MongoDB service
   sudo service mongod start
   
   # Or using Docker
   docker run -d -p 27017:27017 --name mongodb mongo:latest
   ```

5. **Run the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run build
   npm run start:prod
   ```

## 📡 API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID

### Rewards
- `GET /rewards/points/:userId` - Get user's total points
- `GET /rewards/transactions/:userId` - Get user's transaction history

### Transactions
- `GET /transactions` - Get all transactions (paginated)
- `GET /transactions/user/:userId` - Get user transactions (paginated)
- `POST /transactions` - Create new transaction

### Redemptions
- `POST /redemptions/redeem` - Redeem points for rewards
- `GET /redemptions` - Get all redemptions (paginated)
- `GET /redemptions/user/:userId` - Get user redemptions (paginated)

### Analytics
- `GET /analytics/rewards-distribution` - Get rewards distribution analytics

## 🔧 API Usage Examples

### Get User Points
```bash
curl -X GET http://localhost:3000/rewards/points/USER_ID
```

### Create Transaction
```bash
curl -X POST http://localhost:3000/transactions \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "amount": 150.00,
    "category": "Shopping",
    "pointsEarned": 15
  }'
```

### Redeem Points
```bash
curl -X POST http://localhost:3000/redemptions/redeem \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "USER_ID",
    "pointsToRedeem": 100,
    "rewardType": "cashback",
    "rewardDetails": "$10 cashback",
    "rewardValue": 10
  }'
```

### Get Analytics
```bash
curl -X GET http://localhost:3000/analytics/rewards-distribution
```

## 🧪 Testing

### Run Tests
```bash
# Unit tests
npm run test

# Test coverage
npm run test:cov

# E2E tests
npm run test:e2e
```

### Test Coverage
The test suite covers:
- Service layer business logic
- Error handling scenarios
- Edge cases (insufficient points, invalid users)
- Data validation
- Pagination functionality

## 📊 Real-time Features

### WebSocket Integration
Connect to WebSocket for real-time updates:
```javascript
const socket = io('http://localhost:3000');

// Join user room
socket.emit('joinUser', 'USER_ID');

// Listen for point updates
socket.on('pointsUpdated', (data) => {
  console.log('Points updated:', data);
});

// Listen for redemption notifications
socket.on('redemptionCompleted', (data) => {
  console.log('Redemption completed:', data);
});
```

## 📚 Documentation

### Swagger/OpenAPI
Access comprehensive API documentation at:
```
http://localhost:3000/api/docs
```

The documentation includes:
- Detailed endpoint descriptions
- Request/response schemas
- Example payloads
- Error response formats
- Authentication requirements

### API Response Format
All API responses follow a consistent structure:
```json
{
  "success": true,
  "data": {...},
  "message": "Operation completed successfully",
  "timestamp": "2024-01-01T00:00:00Z"
}
```

For paginated responses:
```json
{
  "success": true,
  "data": [...],
  "meta": {
    "page": 1,
    "limit": 10,
    "totalItems": 100,
    "totalPages": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
}
```

## 🔍 Error Handling

### Standard Error Response
```json
{
  "statusCode": 400,
  "timestamp": "2024-01-01T00:00:00Z",
  "path": "/api/endpoint",
  "error": "Detailed error message"
}
```

### Common Error Scenarios
- `400 Bad Request`: Invalid input data or insufficient points
- `404 Not Found`: User or resource not found
- `500 Internal Server Error`: Server-side errors

## 🚀 Performance Considerations

### Database Optimization
- **Indexing**: Strategic indexes on frequently queried fields
- **Aggregation**: Efficient aggregation pipelines for analytics
- **Connection Pooling**: Optimized MongoDB connection management

### Caching Strategy
- Ready for Redis integration for frequently accessed data
- Implementing caching for reward options and user preferences

## 🔒 Security Features

### Data Validation
- Input sanitization using class-validator
- Type checking with TypeScript
- Schema validation at database level

### Error Security
- Standardized error responses
- No sensitive information in error messages
- Proper HTTP status codes

## 🌐 Production Deployment

### Environment Variables
```env
NODE_ENV=production
MONGODB_URI=mongodb://your-production-db
PORT=3000
FRONTEND_URL=https://your-frontend-domain.com
```

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
```

## 🤝 Contributing

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

### Code Style
- Follow NestJS conventions
- Use TypeScript for type safety
- Write comprehensive tests
- Document API changes

## 📈 Future Enhancements

### Planned Features
- [ ] Redis caching implementation
- [ ] Advanced analytics dashboard
- [ ] Email notifications for redemptions
- [ ] Rate limiting for API endpoints
- [ ] Audit logging for all operations
- [ ] Multi-tenant support
- [ ] Advanced reward algorithms

## 🐛 Troubleshooting

### Common Issues

**MongoDB Connection Error**
```
Error: MongoNetworkError: failed to connect to server
```
Solution: Ensure MongoDB is running and connection string is correct

**Port Already in Use**
```
Error: listen EADDRINUSE: address already in use :::3000
```
Solution: Change PORT in .env file or kill existing process

**Module Not Found**
```
Error: Cannot find module '@nestjs/core'
```
Solution: Run `npm install` to install dependencies

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the API documentation at `/api/docs`
- Review the test files for usage examples

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ using NestJS, MongoDB, and TypeScript