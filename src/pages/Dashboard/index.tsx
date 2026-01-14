
import React, { useState, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BillSummaryHeader from './components/BillSummaryHeader';
import UserInfoHeader from './components/UserInfoHeader';
import OverviewTab from './components/OverviewTab';
import UsageTab from './components/UsageTab';
import SavingsTab from './components/SavingsTab';
import MetricCards from './components/MetricCards';
import { dashboardData as defaultDashboardData } from './data/dashboardData';
import MobileDashboardLayout from '@/components/dashboard/MobileDashboardLayout';
import { useIsMobile } from '@/hooks/use-mobile';
import { BillData } from '@/services/openai';
import { motion } from 'framer-motion';
import { FileText, Sparkles } from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const isMobile = useIsMobile();
  const [analyzedBillData, setAnalyzedBillData] = useState<BillData | null>(null);
  const [billImage, setBillImage] = useState<string | null>(null);

  // Load analyzed bill data from sessionStorage
  useEffect(() => {
    const storedBillData = sessionStorage.getItem('billData');
    const storedBillImage = sessionStorage.getItem('billImage');

    if (storedBillData) {
      try {
        setAnalyzedBillData(JSON.parse(storedBillData));
      } catch {
        console.error('Failed to parse bill data');
      }
    }

    if (storedBillImage) {
      setBillImage(storedBillImage);
    }
  }, []);

  // Merge analyzed data with default data
  const dashboardData = useMemo(() => {
    if (!analyzedBillData) return defaultDashboardData;

    // Calculate rate per kWh if we have the data
    const ratePerKwh = analyzedBillData.ratePerKwh
      ? `${(analyzedBillData.ratePerKwh * 100).toFixed(1)}¢`
      : defaultDashboardData.metrics[0].value;

    // Build bill components from analyzed data
    const billComponents = analyzedBillData.charges?.map((charge, index) => ({
      name: charge.name,
      amount: charge.amount,
      color: ['#007AFF', '#34C759', '#FF9500', '#AF52DE', '#FF2D55'][index % 5]
    })) || defaultDashboardData.bill.components;

    return {
      ...defaultDashboardData,
      utilityInfo: {
        provider: analyzedBillData.utilityCompany || defaultDashboardData.utilityInfo.provider,
        name: defaultDashboardData.utilityInfo.name,
      },
      billing: {
        month: analyzedBillData.billingPeriod || defaultDashboardData.billing.month,
        total: analyzedBillData.totalAmount || defaultDashboardData.billing.total,
      },
      metrics: [
        {
          id: 'rate',
          label: 'Current Rate',
          value: ratePerKwh,
          guessedValue: '12¢'
        },
        {
          id: 'usage',
          label: 'Monthly Usage',
          value: analyzedBillData.kwhUsage ? `${analyzedBillData.kwhUsage} kWh` : defaultDashboardData.metrics[1].value,
          comparison: 'Based on your actual bill'
        },
        defaultDashboardData.metrics[2]
      ],
      usage: {
        ...defaultDashboardData.usage,
        current: analyzedBillData.kwhUsage || defaultDashboardData.usage.current,
      },
      uploadDate: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      bill: {
        components: billComponents,
        total: analyzedBillData.totalAmount || billComponents.reduce((sum, c) => sum + c.amount, 0)
      }
    };
  }, [analyzedBillData]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const content = (
    <div className="container max-w-4xl mx-auto px-4 pt-24 pb-12 min-h-screen">
      <div className="space-y-6">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">My Energy Dashboard</h1>
          <p className="text-muted-foreground mt-2">View and manage your energy usage and savings</p>

          {/* Data Source Indicator */}
          {analyzedBillData ? (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-accent/10 text-accent rounded-full text-sm font-medium"
            >
              <Sparkles className="w-4 h-4" />
              <span>Showing your actual bill data</span>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 mt-3 px-3 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              <FileText className="w-4 h-4" />
              <span>Demo data - Upload your bill to see real analysis</span>
            </motion.div>
          )}
        </div>
        
        <UserInfoHeader 
          name={dashboardData.userInfo.name}
          customerSince={dashboardData.userInfo.customerSince}
          utilityProvider={dashboardData.utilityInfo.provider}
          utilityName={dashboardData.utilityInfo.name}
          billingMonth={dashboardData.billing.month}
        />
        
        <BillSummaryHeader
          scoreValue={dashboardData.savingsScore}
          scoreLabel={dashboardData.savingsScoreLabel}
          uploadDate={dashboardData.uploadDate}
        />
        
        <Tabs defaultValue="overview" value={activeTab} onValueChange={handleTabChange}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="usage">Usage</TabsTrigger>
            <TabsTrigger value="savings">Savings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="space-y-6">
              <MetricCards data={dashboardData.metrics} />
              <OverviewTab data={dashboardData} />
            </div>
          </TabsContent>
          
          <TabsContent value="usage" className="mt-6">
            <UsageTab data={dashboardData.usage} />
          </TabsContent>
          
          <TabsContent value="savings" className="mt-6">
            <SavingsTab data={dashboardData.savings} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );

  return isMobile ? (
    <MobileDashboardLayout>
      {content}
    </MobileDashboardLayout>
  ) : (
    <>{content}</>
  );
};

export default Dashboard;
