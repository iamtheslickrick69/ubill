export const monthlyUsageData = [
  { name: 'Jan', value: 920, unit: 'kWh' },
  { name: 'Feb', value: 880, unit: 'kWh' },
  { name: 'Mar', value: 760, unit: 'kWh' },
  { name: 'Apr', value: 720, unit: 'kWh' },
  { name: 'May', value: 680, unit: 'kWh' },
  { name: 'Jun', value: 780, unit: 'kWh' },
  { name: 'Jul', value: 850, unit: 'kWh' },
  { name: 'Aug', value: 920, unit: 'kWh' },
  { name: 'Sep', value: 800, unit: 'kWh' },
  { name: 'Oct', value: 750, unit: 'kWh' },
  { name: 'Nov', value: 820, unit: 'kWh' },
  { name: 'Dec', value: 890, unit: 'kWh' }
];

export const billComponents = [
  { name: 'Energy Charges (842 kWh @ 37.5¢)', amount: 315.75, color: '#4285F4' },
  { name: 'Delivery Charges', amount: 45.30, color: '#9C27B0' },
  { name: 'Taxes & Fees', amount: 28.75, color: '#34A853' },
  { name: 'Other Charges', amount: 36.50, color: '#6c757d' }
];

// Create the dashboardData object with all the necessary data
export const dashboardData = {
  userInfo: {
    name: 'Sarah Johnson',
    customerSince: 'January 2023',
  },
  utilityInfo: {
    provider: 'Pacific Energy & Electric',
    name: 'Standard Residential Plan',
  },
  billing: {
    month: 'May 2023',
    total: 426.30,
  },
  metrics: [
    { id: 'rate', label: 'Current Rate', value: '37.5¢', guessedValue: '25¢' },
    { id: 'usage', label: 'Monthly Usage', value: '842 kWh', comparison: '12% higher than average' },
    { id: 'solar', label: 'Solar Potential', value: '$187/mo', detail: 'Based on your location and usage' }
  ],
  usage: {
    monthly: monthlyUsageData,
    current: 842,
    comparison: {
      efficient: 650,
      average: 750,
      inefficient: 950
    }
  },
  savings: {
    opportunities: [
      { 
        id: 'solar', 
        title: 'Pay Less for Electricity', 
        savings: '12¢/kWh',
        description: 'See why you should be paying around 12¢ per kilowatt hour instead of 37.5¢ with your current utility provider.',
        cta: 'Is Solar Right For Me?',
        icon: 'Sun'
      },
      { 
        id: 'tou', 
        title: 'Time-of-Use Plan', 
        savings: 45,
        description: 'Switching to a Time-of-Use plan could save you approximately $45/month based on your usage patterns.',
        cta: 'Compare Plans',
        icon: 'Clock'
      },
      { 
        id: 'appliances', 
        title: 'Energy Efficient Appliances', 
        savings: 85,
        description: 'Upgrading to energy efficient appliances could reduce your bill by 20%.',
        cta: 'View Upgrades',
        icon: 'Zap'
      }
    ],
    quickWins: [
      'Shift laundry and dishwasher use to off-peak hours (before 4pm) (savings: ~$15/month)',
      'Unplug electronics when not in use (savings: ~$15/month)',
      'Adjust your thermostat by 2 degrees (savings: ~$20/month)',
      'Replace light bulbs with LED alternatives (savings: ~$10/month)'
    ]
  },
  savingsScore: 82,
  savingsScoreLabel: 'Good',
  uploadDate: 'May 15, 2023',
  bill: {
    components: billComponents,
    total: billComponents.reduce((sum, component) => sum + component.amount, 0)
  }
};
