import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTestChecklistStatus } from './TestChecklist';
import Card, { CardHeader, CardTitle, CardContent } from '../components/ui/Card';

const TOTAL_TESTS = 10;

export default function ShipPage() {
  const navigate = useNavigate();
  const status = getTestChecklistStatus();
  const passed = Object.values(status).filter(Boolean).length;
  const allPassed = passed === TOTAL_TESTS;

  useEffect(() => {
    if (!allPassed) {
      // Redirect to test checklist if not all tests passed
      navigate('/dashboard/test', { replace: true });
    }
  }, [allPassed, navigate]);

  if (!allPassed) {
    return null; // Will redirect immediately
  }

  return (
    <div className="app-container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Deployment & Shipping</h1>
        <p className="text-sm text-gray-600 mt-1">All tests passed. Ready to deploy the Placement Readiness Platform.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Pre-Ship Checklist</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-green-50 text-green-700 px-4 py-3 rounded-md text-sm mb-4">
              ✓ All 10 quality tests passed
            </div>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ Input validation working</li>
              <li>✓ JD length warnings enabled</li>
              <li>✓ Skills extraction reliable</li>
              <li>✓ Company intel + round mapping functional</li>
              <li>✓ Score stability verified</li>
              <li>✓ Skill toggles responsive</li>
              <li>✓ Data persistence confirmed</li>
              <li>✓ History management robust</li>
              <li>✓ Export/copy features working</li>
              <li>✓ No console errors detected</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Deployment Info</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-sm text-gray-700">
              <div>
                <strong className="block text-gray-900">Platform:</strong>
                Placement Readiness Platform (KodNest)
              </div>
              <div>
                <strong className="block text-gray-900">Status:</strong>
                <span className="text-green-700 font-semibold">READY TO SHIP</span>
              </div>
              <div>
                <strong className="block text-gray-900">Local Data:</strong>
                All analyses and test results stored in browser localStorage
              </div>
              <div>
                <strong className="block text-gray-900">Next Steps:</strong>
                <ul className="list-disc pl-5 mt-1">
                  <li>Review code on GitHub/GitLab</li>
                  <li>Run final staging tests</li>
                  <li>Deploy to production</li>
                  <li>Monitor for console errors</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardContent className="pt-6">
            <div className="bg-blue-50 text-blue-700 px-4 py-3 rounded-md text-sm">
              <strong>Note:</strong> This deployment page is locked and only accessible after all tests pass. 
              Navigate away to return to the checklist if needed.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
