
import React, { useState } from 'react';
import { IntentQuestion, IntentLevel } from '../../data/types';
import { intentQuestions } from '../../data/intentQuestionsData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useUserProfile } from '../../contexts/UserProfileContext';
import { toast } from '@/hooks/use-toast';

interface IntentQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete: () => void;
}

const IntentQuizModal: React.FC<IntentQuizModalProps> = ({ open, onOpenChange, onComplete }) => {
  const { updateUserProfile, calculateIntentLevel } = useUserProfile();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, IntentLevel>>({});
  
  const currentQuestion = intentQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === intentQuestions.length - 1;

  const handleAnswer = (value: IntentLevel) => {
    // Save the answer
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));

    if (isLastQuestion) {
      // Calculate intent level and save to profile
      const newAnswers = { ...answers, [currentQuestion.id]: value };
      const intentLevel = calculateIntentLevel(newAnswers);
      
      updateUserProfile({ 
        intentLevel,
        lastQuizDate: new Date()
      });
      
      toast({
        title: "感谢您的回答",
        description: "我们已根据您的偏好定制了赛事推荐"
      });
      
      onComplete();
      onOpenChange(false);
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  // Reset quiz when modal is opened
  React.useEffect(() => {
    if (open) resetQuiz();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl text-center">体育赛事偏好调查</DialogTitle>
        </DialogHeader>
        
        <div className="py-4">
          <h3 className="text-lg font-medium mb-4">{currentQuestion?.text}</h3>
          
          <div className="space-y-2">
            {currentQuestion?.options.map((option, index) => (
              <button
                key={index}
                className="w-full p-4 border rounded-lg text-left hover:bg-meituan-blue/5 hover:border-meituan-blue transition-colors"
                onClick={() => handleAnswer(option.value)}
              >
                {option.text}
              </button>
            ))}
          </div>
          
          <div className="flex justify-center mt-6">
            {intentQuestions.map((_, idx) => (
              <div 
                key={idx}
                className={`w-2 h-2 rounded-full mx-1 ${
                  idx === currentQuestionIndex 
                    ? 'bg-meituan-orange' 
                    : idx < currentQuestionIndex 
                      ? 'bg-meituan-blue' 
                      : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
        </div>
        
        <DialogFooter className="sm:justify-between">
          <Button 
            variant="outline" 
            onClick={() => {
              onOpenChange(false);
              onComplete();
            }}
          >
            稍后再说
          </Button>
          
          {!isLastQuestion && currentQuestionIndex > 0 && (
            <Button 
              variant="ghost" 
              onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
            >
              上一题
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default IntentQuizModal;
