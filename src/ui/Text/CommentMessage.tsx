import React, {useEffect} from 'react';
import {Touchable, View} from 'react-native';
import {Image} from 'react-native';
import TextTitle from './TextCustom';
import {CommentInterface} from '../ScreenView/MainScreen/interfaces/university.interface';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {baseApiUrl} from '@api/config';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageEnum} from 'src/navigation/types/storage.type';
import useAuth from 'src/hooks/auth/useAuth';
import {icon} from 'src/assets/icons';

interface Props extends CommentInterface {
  onPress: (parentId: string) => void;
  children?: React.ReactNode;
  isChild?: boolean;
}
const CommentMessage: React.FC<Props> = innitialComment => {
  const [comment, setComment] = React.useState<CommentInterface>();

  const {user} = useAuth();

  useEffect(() => {
    setComment(innitialComment);
  }, [innitialComment]);

  if (!comment || !user) {
    return null;
  }

  const date =
    new Date(comment.createdAt).toLocaleDateString() +
    ' ' +
    new Date(comment.createdAt).toLocaleTimeString();

  const like = async (like: 'like' | 'dislike') => {
    try {
      const token = await AsyncStorage.getItem(StorageEnum.accessToken);

      if (user) {
        if (like === 'like') {
          if (comment.likedBy.includes(user.id)) {
            setComment({
              ...comment,
              likes: comment.likes - 1,
              likedBy: comment.likedBy.filter(item => item !== user.id),
            });
          } else {
            if (comment.dislikedBy.includes(user.id)) {
              setComment({
                ...comment,
                likes: comment.likes + 1,
                likedBy: [...comment.likedBy, user.id],
                dislikedBy: comment.dislikedBy.filter(item => item !== user.id),
                dislikes: comment.dislikes - 1,
              });
            } else {
              setComment({
                ...comment,
                likes: comment.likes + 1,
                likedBy: [...comment.likedBy, user.id],
              });
            }
          }
        }

        if (like === 'dislike') {
          if (comment.dislikedBy.includes(user.id)) {
            setComment({
              ...comment,
              dislikes: comment.dislikes - 1,
              dislikedBy: comment.dislikedBy.filter(item => item !== user.id),
            });
          } else {
            if (comment.likedBy.includes(user.id)) {
              setComment({
                ...comment,
                likes: comment.likes - 1,
                likedBy: comment.likedBy.filter(item => item !== user.id),
                dislikes: comment.dislikes + 1,
                dislikedBy: [...comment.dislikedBy, user.id],
              });
            } else {
              setComment({
                ...comment,
                dislikes: comment.dislikes + 1,
                dislikedBy: [...comment.dislikedBy, user.id],
              });
            }
          }
        }
      }

      await axios.put(
        `https://hqua0325043.online-vm.com/comments/like/${comment.id}/${like}`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };

  console.log(comment.likedBy);

  return (
    <View
      style={{
        width: '100%',
      }}>
      {!innitialComment.isChild && (
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#3D3B3E',
            marginTop: 8,
          }}
        />
      )}

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}>
        {innitialComment.isChild && (
          <Image
            source={require('@assets/icons/circle-arrow.png')}
            style={{
              width: 24,
              height: 24,
              margin: 8,
              marginTop: 24,
            }}
          />
        )}

        <View
          style={{
            flex: 1,
          }}>
          <View>
            <View
              style={{
                width: '100%',
                marginTop: 24,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: 12,
                }}>
                <Image
                  source={require('@assets/images/comment-avatar.png')}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />

                <View>
                  <TextTitle fontSize={16}>{comment.fullname}</TextTitle>
                  <TextTitle color="#84858BFF" fontWeight="400" fontSize={12}>
                    {date}
                  </TextTitle>
                </View>
              </View>

              {!innitialComment.isChild && (
                <TextTitle
                  onPress={() => {
                    innitialComment.onPress(comment.id);
                  }}
                  textAlign="right"
                  fontWeight="400"
                  color="#91939F"
                  fontSize={14}>
                  відповісти
                </TextTitle>
              )}
            </View>
          </View>
          <TextTitle
            style={{
              marginTop: 16,
            }}
            fontWeight="400"
            color="#91939F"
            fontSize={16}>
            {comment.comment}
          </TextTitle>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 16,
            }}>
            {!innitialComment.isChild && (
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <TextTitle color="#91939F" fontWeight="400" fontSize={14}>
                  Оцінка:
                </TextTitle>
                {[1, 2, 3, 4, 5].map((item, index) => (
                  <Image
                    key={index}
                    source={require('@assets/icons/star.png')}
                    style={{
                      width: 12,
                      height: 12,
                      tintColor: index < comment.rate ? '#FFC700' : '#91939F',
                    }}
                  />
                ))}
              </View>
            )}

            {innitialComment.isChild && <View />}

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
              }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  like('like');
                }}>
                <Image
                  source={
                    comment.likedBy.includes(user.id)
                      ? icon.likeFilled
                      : icon.like
                  }
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableOpacity>

              <TextTitle color="#91939F" fontWeight="400" fontSize={14}>
                {comment.likes}
              </TextTitle>

              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  like('dislike');
                }}>
                <Image
                  source={
                    comment.dislikedBy.includes(user.id)
                      ? icon.dislikeFilled
                      : icon.dislike
                  }
                  style={{
                    width: 20,
                    height: 20,
                    marginLeft: 8,
                  }}
                />
              </TouchableOpacity>

              <TextTitle color="#91939F" fontWeight="400" fontSize={14}>
                {comment.dislikes}
              </TextTitle>
            </View>
          </View>

          {innitialComment.children}
        </View>
      </View>
    </View>
  );
};

export default CommentMessage;
