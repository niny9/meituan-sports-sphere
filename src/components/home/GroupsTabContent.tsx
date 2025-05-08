
import React from 'react';
import { Users, Calendar } from 'lucide-react';

interface Community {
  id: number;
  name: string;
  members: number;
  image: string;
}

interface GroupsTabContentProps {
  sportsCommunities: Community[];
}

const GroupsTabContent: React.FC<GroupsTabContentProps> = ({ sportsCommunities }) => {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-meituan-blue flex items-center">
          <Users className="h-5 w-5 mr-2" />
          运动社群
        </h2>
        <button className="text-sm text-meituan-blue hover:underline">
          发现更多
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sportsCommunities.map(community => (
          <div 
            key={community.id} 
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img 
                src={community.image} 
                alt={community.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                <h3 className="font-bold text-white">{community.name}</h3>
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                <Users className="h-4 w-4 inline mr-1" />
                {community.members} 成员
              </span>
              <button className="text-xs bg-meituan-blue text-white px-3 py-1 rounded-full">
                加入
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">即将开始的活动</h3>
        <div className="bg-white rounded-xl p-4">
          {[
            { title: "周末五公里晨跑", date: "5月10日 06:30", group: "北京跑步俱乐部", participants: 28 },
            { title: "篮球友谊赛", date: "5月11日 15:00", group: "篮球爱好者联盟", participants: 16 },
            { title: "环颐和园骑行", date: "5月12日 09:00", group: "自行车骑行团", participants: 42 }
          ].map((activity, idx) => (
            <div key={idx} className="flex py-3 border-b last:border-0">
              <div className="p-2 mr-3 bg-meituan-gray rounded-lg h-min">
                <Calendar className="h-5 w-5 text-meituan-blue" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium">{activity.title}</h4>
                <p className="text-xs text-gray-500 mt-1">举办方: {activity.group}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs text-meituan-darkGray">{activity.date}</span>
                  <div className="flex items-center">
                    <Users className="h-3 w-3 text-gray-400 mr-1" />
                    <span className="text-xs text-gray-500">{activity.participants}人参与</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroupsTabContent;
