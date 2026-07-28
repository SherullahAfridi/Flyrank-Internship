import { useState, useEffect } from "react";

// Small helper hook: animates a number counting up from 0 to targetValue.
function useCountUp(targetValue, durationMs = 800) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrameId;
    const startTime = performance.now();
    const startValue = 0;

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      const currentValue = Math.round(startValue + (targetValue - startValue) * progress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    }

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetValue, durationMs]);

  return displayValue;
}

function AnalyticsPanel({ tasks, activityLog }) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const animatedCompletion = useCountUp(completionPercentage);

  // Priority distribution
  const highCount = tasks.filter((task) => task.priority === "high").length;
  const mediumCount = tasks.filter((task) => task.priority === "medium").length;
  const lowCount = tasks.filter((task) => task.priority === "low").length;
  const priorityTotal = highCount + mediumCount + lowCount;

  function percentOf(count) {
    return priorityTotal === 0 ? 0 : Math.round((count / priorityTotal) * 100);
  }

  // Weekly window: today through 6 days from now
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const weekEnd = new Date(today);
  weekEnd.setDate(weekEnd.getDate() + 6);

  const weeklyTasks = tasks.filter((task) => {
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    return due >= today && due <= weekEnd;
  });
  const weeklyCompleted = weeklyTasks.filter((task) => task.completed).length;
  const weeklyPercentage =
    weeklyTasks.length === 0 ? 0 : Math.round((weeklyCompleted / weeklyTasks.length) * 100);

  // Overdue / due today, for insights
  const overdueCount = tasks.filter((task) => {
    if (task.completed) return false;
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
  }).length;

  const dueTodayCount = tasks.filter((task) => {
    if (task.completed) return false;
    const due = new Date(task.dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime();
  }).length;

  const highPriorityPending = tasks.filter(
    (task) => task.priority === "high" && !task.completed
  ).length;

  // Build the quick-insight sentences
  const insights = [];
  if (totalTasks === 0) {
    insights.push("Add your first task to start tracking your productivity.");
  } else {
    insights.push(`You've completed ${completionPercentage}% of your tasks.`);
    if (dueTodayCount > 0) {
      insights.push(
        `${dueTodayCount} task${dueTodayCount === 1 ? " is" : "s are"} due today.`
      );
    }
    if (overdueCount > 0) {
      insights.push(
        `${overdueCount} task${overdueCount === 1 ? " is" : "s are"} overdue.`
      );
    }
    if (highPriorityPending > 0) {
      insights.push("High-priority tasks require your attention.");
    }
    if (dueTodayCount === 0 && overdueCount === 0 && highPriorityPending === 0) {
      insights.push("You're fully caught up. Nice work!");
    }
  }

  return (
    <section className="analytics-panel" aria-label="Productivity analytics">
      <h2 className="section-heading">Productivity Insights</h2>

      <div className="analytics-grid">
        {/* Completion Progress Ring */}
        <div className="analytics-card">
          <p className="analytics-card-title">Overall Completion</p>
          <div
            className="progress-ring"
            style={{ "--ring-percentage": animatedCompletion }}
          >
            <div className="progress-ring-inner">
              <span className="progress-ring-value">{animatedCompletion}%</span>
            </div>
          </div>
        </div>

        {/* Task Status Doughnut */}
        <div className="analytics-card">
          <p className="analytics-card-title">Task Status</p>
          <div
            className="status-doughnut"
            style={{
              "--completed-percentage": totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100,
            }}
          >
            <div className="status-doughnut-inner">
              <span className="status-doughnut-value">{totalTasks}</span>
              <span className="status-doughnut-label">Total</span>
            </div>
          </div>
          <div className="doughnut-legend">
            <span className="legend-item">
              <span className="legend-dot legend-dot-completed"></span>
              Completed ({completedTasks})
            </span>
            <span className="legend-item">
              <span className="legend-dot legend-dot-pending"></span>
              Pending ({pendingTasks})
            </span>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="analytics-card">
          <p className="analytics-card-title">Priority Distribution</p>
          <div className="priority-bars">
            <div className="priority-bar-row">
              <span className="priority-bar-label">High</span>
              <div className="priority-bar-track">
                <div
                  className="priority-bar-fill priority-bar-high"
                  style={{ width: `${percentOf(highCount)}%` }}
                ></div>
              </div>
              <span className="priority-bar-count">{highCount}</span>
            </div>
            <div className="priority-bar-row">
              <span className="priority-bar-label">Medium</span>
              <div className="priority-bar-track">
                <div
                  className="priority-bar-fill priority-bar-medium"
                  style={{ width: `${percentOf(mediumCount)}%` }}
                ></div>
              </div>
              <span className="priority-bar-count">{mediumCount}</span>
            </div>
            <div className="priority-bar-row">
              <span className="priority-bar-label">Low</span>
              <div className="priority-bar-track">
                <div
                  className="priority-bar-fill priority-bar-low"
                  style={{ width: `${percentOf(lowCount)}%` }}
                ></div>
              </div>
              <span className="priority-bar-count">{lowCount}</span>
            </div>
          </div>
        </div>

        {/* Weekly Productivity */}
        <div className="analytics-card">
          <p className="analytics-card-title">This Week</p>
          <div className="weekly-bar-track">
            <div
              className="weekly-bar-fill"
              style={{ width: `${weeklyPercentage}%` }}
            ></div>
          </div>
          <p className="weekly-bar-caption">
            {weeklyCompleted} of {weeklyTasks.length} tasks due this week completed (
            {weeklyPercentage}%)
          </p>
        </div>

        {/* Recent Activity */}
        <div className="analytics-card analytics-card-wide">
          <p className="analytics-card-title">Recent Activity</p>
          {activityLog.length === 0 ? (
            <p className="activity-empty">No activity yet.</p>
          ) : (
            <ul className="activity-list">
              {activityLog.map((entry) => (
                <li key={entry.id} className="activity-item">
                  <span className="activity-dot"></span>
                  <span className="activity-message">{entry.message}</span>
                  <span className="activity-time">{entry.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Quick Insights */}
        <div className="analytics-card analytics-card-wide">
          <p className="analytics-card-title">Quick Insights</p>
          <ul className="insights-list">
            {insights.map((insight, index) => (
              <li key={index} className="insight-item">
                <span aria-hidden="true">✓</span> {insight}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default AnalyticsPanel;