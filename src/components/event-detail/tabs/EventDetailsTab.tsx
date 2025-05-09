
import React from 'react';
import { Event } from '@/data';
import { MapPin } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface EventDetailsTabProps {
  event: Event;
}

const EventDetailsTab: React.FC<EventDetailsTabProps> = ({ event }) => {
  const handleShare = () => {
    toast({
      title: "分享成功",
      description: "赛事信息已复制到剪贴板，您可以分享给好友",
    });
  };

  const handleCreatePlan = () => {
    toast({
      title: "规划已创建",
      description: "已为您创建赛事规划，可在'赛事规划'中查看",
    });
  };

  return (
    <>
      <div className="flex flex-wrap gap-3 mb-8">
        <button className="px-4 py-2 rounded-full bg-meituan-orange text-white font-medium hover:bg-meituan-orange/90 transition">
          立即报名
        </button>
        <button className="px-4 py-2 rounded-full border border-meituan-blue text-meituan-blue hover:bg-meituan-blue/10 transition">
          添加日历
        </button>
        <button 
          className="px-4 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
          onClick={handleShare}
        >
          分享赛事
        </button>
      </div>
      
      <div className="mb-8">
        <div className="bg-meituan-gray rounded-xl p-5">
          <h2 className="text-lg font-bold text-meituan-blue mb-3">嗨赛智荐 | 赛事助手推荐</h2>
          <p className="text-gray-600 mb-4">
            根据您的兴趣和历史行为，我们为您定制了以下服务方案，帮助您顺利参与这场赛事。
          </p>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-xl font-bold text-meituan-orange mb-1">72%</div>
              <div className="text-sm text-gray-600">赛事匹配度</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-xl font-bold text-meituan-blue mb-1">98%</div>
              <div className="text-sm text-gray-600">用户满意度</div>
            </div>
            <div className="bg-white p-3 rounded-lg shadow-sm">
              <div className="text-xl font-bold text-green-500 mb-1">85%</div>
              <div className="text-sm text-gray-600">参与意向度</div>
            </div>
          </div>
        </div>
      </div>
      
      <section className="mb-8">
        <h2 className="text-lg font-bold text-meituan-blue mb-3">赛事详情</h2>
        <p className="text-gray-600 mb-4">
          {event.title}是一场备受瞩目的体育盛事，将于{new Date(event.date).toLocaleDateString('zh-CN')}在{event.location}举行。
          这场比赛吸引了来自全国各地的体育爱好者和专业运动员参与，现场氛围热烈。
        </p>
        <p className="text-gray-600">
          赛事组织方提供完善的后勤保障和医疗服务，确保参赛者的安全。同时，美团为您精心准备了周边的餐饮、住宿和交通等全方位服务，让您的赛事体验更加便捷舒适。
        </p>
      </section>
      
      <section>
        <h2 className="text-lg font-bold text-meituan-blue mb-3">位置信息</h2>
        <div className="h-48 bg-meituan-gray rounded-lg flex items-center justify-center">
          <div className="text-gray-500 flex flex-col items-center">
            <MapPin className="h-6 w-6 mb-2" />
            <span>{event.location}</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default EventDetailsTab;
