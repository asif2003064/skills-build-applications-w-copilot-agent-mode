from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Team, Activity, Leaderboard, Workout

class ModelTests(TestCase):
    def test_team_creation(self):
        team = Team.objects.create(name='TestTeam')
        self.assertEqual(team.name, 'TestTeam')

    def test_activity_creation(self):
        activity = Activity.objects.create(name='TestActivity', user='testuser', team='TestTeam')
        self.assertEqual(activity.name, 'TestActivity')

    def test_leaderboard_creation(self):
        leaderboard = Leaderboard.objects.create(team='TestTeam', points=100)
        self.assertEqual(leaderboard.points, 100)

    def test_workout_creation(self):
        workout = Workout.objects.create(name='TestWorkout', description='TestDesc')
        self.assertEqual(workout.name, 'TestWorkout')

    def test_user_creation(self):
        User = get_user_model()
        user = User.objects.create_user(username='testuser', email='test@example.com', password='pass')
        self.assertEqual(user.username, 'testuser')
