import jwt
from django.conf import settings
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth import get_user_model
from channels.db import database_sync_to_async

@database_sync_to_async
def get_user(scope):
    access_token = scope["access_token"]
    model = get_user_model()
    

    try:
        if access_token:
            user_id = jwt.decode(access_token, settings.SECRET_KEY, algorithms=['HS256'])["user_id"]
            return model.objects.get(id=user_id)
        else:
            return AnonymousUser()
    except (jwt.exceptions.DecodeError, model.DoesNotExist):
        return AnonymousUser()

class JWTAuthMiddleware:
    
    def __init__(self, app):
        self.app = app

    
    async def __call__(self, scope, recieve, send):
        # print(scope)
        headers_dict = dict(scope['headers'])
        cookies_str = headers_dict.get(b'cookie', b"").decode('utf-8')
        cookies = {cookie.split("=")[0]: cookie.split("=")[1] for cookie in cookies_str.split("; ")}
        access = cookies['access']

        scope["access_token"] = access
        scope["user"] = await get_user(scope)


        return await self.app(scope,recieve, send)
    