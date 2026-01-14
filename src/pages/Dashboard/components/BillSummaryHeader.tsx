
import React from 'react';
import EnergyScoreCircle from '@/components/EnergyScoreCircle';
import UploadBillButton from '@/components/UploadBillButton';

interface BillSummaryHeaderProps {
  scoreValue: number;
  scoreLabel: string;
  uploadDate: string;
}

const BillSummaryHeader: React.FC<BillSummaryHeaderProps> = ({
  scoreValue,
  scoreLabel,
  uploadDate
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Your Energy Bill Analysis</h2>
        <p className="text-muted-foreground">Uploaded on {uploadDate}</p>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center">
          <p className="text-xs text-muted-foreground mb-1">Savings Score</p>
          <EnergyScoreCircle score={scoreValue} />
        </div>

        <UploadBillButton variant="secondary" size="default">
          Upload New Bill
        </UploadBillButton>
      </div>
    </div>
  );
};

export default BillSummaryHeader;
